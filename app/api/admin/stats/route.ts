import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase-server";

const ADMIN_EMAIL = "desousabruno64@gmail.com";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Verify the user is the admin
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const admin = createAdminClient();

  // CV count
  const { data: statsData } = await admin
    .from("stats")
    .select("value")
    .eq("key", "cv_generated")
    .single();
  const cvCount = (statsData?.value as number) ?? 0;

  // User count
  let userCount = 0;
  try {
    const { data: usersData } = await admin.auth.admin.listUsers({ page: 1, perPage: 1 });
    userCount = (usersData as { total?: number })?.total ?? 0;
  } catch {
    userCount = 0;
  }

  // Daily page views (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: viewsData } = await admin
    .from("page_views")
    .select("visited_at")
    .gte("visited_at", sevenDaysAgo.toISOString());

  const dailyViews: Record<string, number> = {};
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dailyViews[d.toISOString().slice(0, 10)] = 0;
  }

  for (const row of viewsData ?? []) {
    const day = (row.visited_at as string).slice(0, 10);
    if (day in dailyViews) dailyViews[day] = (dailyViews[day] ?? 0) + 1;
  }

  const visitsToday = dailyViews[today.toISOString().slice(0, 10)] ?? 0;

  return NextResponse.json({
    cvCount,
    userCount,
    visitsToday,
    dailyViews: Object.entries(dailyViews).map(([date, count]) => ({ date, count })),
  });
}
