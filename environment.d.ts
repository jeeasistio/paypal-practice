declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvTypes {
            NEXT_PUBLIC_PAYPAL_CLIENT_ID: string
            PAYPAL_CLIENT_SECRET: string
        }
    }
}

export {}
