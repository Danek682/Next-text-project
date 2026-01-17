export default async function formHandler(req, res) {
    return checkTurnstileToken(req, res);
}

async function checkTurnstileToken(req, res) {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const token = req.body.token; 

    const formData = new URLSearchParams(); 
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
    formData.append('response', token);

    try {
        const result = await fetch(url, {
            body: formData,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const outcome = await result.json();

        if (outcome.success) {
            return processForm(req, res); 
        }
    } catch (err) {
        console.error(err);
    }

    res.status(500).json({ message: "Failed to validate CAPTCHA response" });
}

async function processForm(req, res) {
    res.status(200).json({ message: "Captcha passed! Form processed." });
}