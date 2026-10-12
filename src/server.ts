import express, { type Request, type Response, type NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
};
const db = getFirestore();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
});

initializeApp({
    credential: cert(serviceAccount)
})

app.use(express.json());

app.get('/', (req: Request, res: Response ) => {
    res.json({
        message: 'Ola eu sou backend feito com Express e typescript que ta rodando '
    })
});

app.get('/health', (req: Request, res: Response) => {
    const healthCheck = {
        status: 'UP',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        memoryUsage: {
            rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
            heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
        },
        version: '1.0.0'
    }

    try {
        res.status(200).json(
            healthCheck
        )
    } catch (error) {
        res.status(503).json({
            status: 'DOWN',
            message: 'Serviço indesponivel'
        })
    }
});

app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: 'O idToken é obrigatório.' });
        }

        // 1. Valida o token com a nova sintaxe getAuth()
        const decodedToken = await getAuth().verifyIdToken(idToken);
        const { uid, email } = decodedToken;

        // 2. Acede à base de dados (Firestore)
        const userRef = db.collection('users').doc(uid);
        await userRef.set({
            email,
            // Usa o FieldValue importado diretamente
            lastLogin: FieldValue.serverTimestamp(),
        }, { merge: true });

        // 3. Retorna sucesso
        res.status(200).json({
            message: 'Login realizado com sucesso',
            user: { uid, email }
        });

    } catch (error) {
        // Envia o erro para o Sentry
        next(error); 
    }
});

app.get('/debug-sentry', (req: Request, res: Response) => {
    throw new Error("Erro de teste para o Sentry! O monitoramento está online.")
});

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
})