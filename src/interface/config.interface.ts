export interface IDBCONFIG {
    url: string;
    userName: string;
    password: string;
}

export interface ICACHECONFIG {
    host: string;
    port: number;
}

export interface IENVCONFIG {
    HOST: string;
    PORT: string;
    CON_HOST: string;
    CON_PORT: string;
    CACHE_CONFIG: ICACHECONFIG;
    MONGO_CONFIG: ConnectOptions;
}

export interface MONGO_CONFIG extends ConnectOptions {
    "MONGO_URL": string
}
export interface ConnectOptions {
    "useNewUrlParser": boolean,
    "useCreateIndex": boolean,
    "useUnifiedTopology": boolean
}
