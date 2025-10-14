import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        // Validación mínima para desarrollo. Sustituir por validación real contra backend.
        if (!email || !password) return null;

        return {
          id: email,
          name: email.split('@')[0],
          email
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    async signIn({ account }) {
      // Permitir inicio de sesión mediante credenciales
      return account?.provider === 'credentials';
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Para credenciales, tomar datos del usuario autenticado
      if (user) {
        token.name = user.name;
        token.email = user.email as string;
      }
      // No hay access_token en credenciales; conservar si existiera
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (account && (account as any).access_token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (token as any).accessToken = (account as any).access_token;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};
