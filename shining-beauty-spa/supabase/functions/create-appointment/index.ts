Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Max-Age': '86400',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { name, email, phone, service_id, service_name, appointment_date, appointment_time, message } = await req.json();

        // Validate required fields
        if (!name || !email || !phone || !service_name || !appointment_date || !appointment_time) {
            throw new Error('Tüm zorunlu alanları doldurun');
        }

        // Get Supabase credentials
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Supabase configuration missing');
        }

        // Insert appointment into database
        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/appointments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'apikey': supabaseServiceKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                service_id,
                service_name,
                appointment_date,
                appointment_time,
                message,
                status: 'pending'
            })
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            throw new Error(`Randevu kaydedilemedi: ${errorText}`);
        }

        const appointmentData = await insertResponse.json();

        // Send confirmation email (simplified - in production use a real email service)
        console.log(`Randevu oluşturuldu: ${name} - ${appointment_date} ${appointment_time}`);
        
        // Here you would integrate with an email service like Resend, SendGrid, etc.
        // For now, we'll just log it
        
        return new Response(JSON.stringify({
            success: true,
            message: 'Randevunuz başarıyla oluşturuldu. En kısa sürede size dönüş yapacağız.',
            data: appointmentData[0]
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (error) {
        console.error('Appointment creation error:', error);

        return new Response(JSON.stringify({
            success: false,
            error: {
                code: 'APPOINTMENT_ERROR',
                message: error.message
            }
        }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
