require('dotenv').config(); 

// Supabase instance 
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Middleware to verify if user is autheticated 
const authenticateUser = async (req, res, next) => {
    try {        
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token no proporcionado o inválido' });
        }

        // Get token
        const token = authHeader.split(' ')[1]; 

        // Check if token is valid
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        req.user = data.user;        
        next();
        
    } catch (err) {
        console.error('Error en autenticación:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = authenticateUser;
