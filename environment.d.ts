declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvTypes {
            NEXT_PAYPAL_CLIENT_ID: string
            NEXT_PAYPAL_CLIENT_SECRET: string
        }
    }
}

export {}
