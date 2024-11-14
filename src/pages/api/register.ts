import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { createUser } from '../../lib/mongodb';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    // Register with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400,
      });
    }

    // Create user in MongoDB
    await createUser({
      email,
      supabaseId: authData.user?.id,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}