declare function _exports(_: any, { mode }: {
    mode: any;
}): {
    devServer: {
        contentBase: string;
        compress: boolean;
        port: number;
        historyApiFallback: boolean;
    };
    module: {
        rules: ({
            test: RegExp;
            use: ({
                loader: string;
                options: {
                    prettier: boolean;
                    svgo: boolean;
                    svgoConfig: {
                        plugins: {
                            removeViewBox: boolean;
                        }[];
                    };
                    titleProp: boolean;
                    ref: boolean;
                    name?: undefined;
                };
            } | {
                loader: string;
                options: {
                    name: string;
                    prettier?: undefined;
                    svgo?: undefined;
                    svgoConfig?: undefined;
                    titleProp?: undefined;
                    ref?: undefined;
                };
            })[];
            issuer: {
                and: RegExp[];
            };
            type?: undefined;
            include?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            type: string;
            use?: undefined;
            issuer?: undefined;
            include?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    importLoaders: number;
                    modules: {
                        localIdentName: string;
                    };
                    lessOptions?: undefined;
                };
            } | {
                loader: string;
                options: {
                    lessOptions: {
                        plugins: LessPluginRemoveAntdGlobalStyles[];
                        javascriptEnabled: boolean;
                    };
                    importLoaders?: undefined;
                    modules?: undefined;
                };
            })[];
            include: RegExp;
            issuer?: undefined;
            type?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            loader: string;
            exclude: RegExp;
            use?: undefined;
            issuer?: undefined;
            type?: undefined;
            include?: undefined;
        } | {
            test: RegExp;
            include: RegExp;
            use: (string | {
                loader: string;
                options: {
                    lessOptions: {
                        plugins: LessPluginRemoveAntdGlobalStyles[];
                        modifyVars: {
                            "ant-prefix": string;
                        };
                        javascriptEnabled: boolean;
                    };
                };
            })[];
            issuer?: undefined;
            type?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            use: (string | {
                loader: string;
                options: {
                    lessOptions: {
                        plugins: LessPluginRemoveAntdGlobalStyles[];
                        javascriptEnabled: boolean;
                    };
                };
            })[];
            issuer?: undefined;
            type?: undefined;
            include?: undefined;
            loader?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            use: (string | {
                loader: string;
                options: {
                    modules: boolean;
                };
            })[];
            issuer?: undefined;
            type?: undefined;
            include?: undefined;
            loader?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp[];
            use: string[];
            issuer?: undefined;
            type?: undefined;
            include?: undefined;
            loader?: undefined;
        })[];
    };
    plugins: any[];
    externals: {
        react: string;
        "react-dom": string;
    };
    mode: any;
    entry: string;
    output: {
        path: string;
        filename: string;
        library: string;
        libraryTarget: string;
        publicPath: string;
    };
    resolve: {
        extensions: string[];
        alias: {
            "@": string;
        };
    };
} | {
    devServer: {
        contentBase: string;
        compress: boolean;
        port: number;
        historyApiFallback: boolean;
    };
    module: {
        rules: ({
            test: RegExp;
            use: ({
                loader: string;
                options: {
                    prettier: boolean;
                    svgo: boolean;
                    svgoConfig: {
                        plugins: {
                            removeViewBox: boolean;
                        }[];
                    };
                    titleProp: boolean;
                    ref: boolean;
                    name?: undefined;
                };
            } | {
                loader: string;
                options: {
                    name: string;
                    prettier?: undefined;
                    svgo?: undefined;
                    svgoConfig?: undefined;
                    titleProp?: undefined;
                    ref?: undefined;
                };
            })[];
            issuer: {
                and: RegExp[];
            };
            type?: undefined;
            include?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            type: string;
            use?: undefined;
            issuer?: undefined;
            include?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    importLoaders: number;
                    modules: {
                        localIdentName: string;
                    };
                    lessOptions?: undefined;
                };
            } | {
                loader: string;
                options: {
                    lessOptions: {
                        plugins: LessPluginRemoveAntdGlobalStyles[];
                        javascriptEnabled: boolean;
                    };
                    importLoaders?: undefined;
                    modules?: undefined;
                };
            })[];
            include: RegExp;
            issuer?: undefined;
            type?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            loader: string;
            exclude: RegExp;
            use?: undefined;
            issuer?: undefined;
            type?: undefined;
            include?: undefined;
        } | {
            test: RegExp;
            include: RegExp;
            use: (string | {
                loader: string;
                options: {
                    lessOptions: {
                        plugins: LessPluginRemoveAntdGlobalStyles[];
                        modifyVars: {
                            "ant-prefix": string;
                        };
                        javascriptEnabled: boolean;
                    };
                };
            })[];
            issuer?: undefined;
            type?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            use: (string | {
                loader: string;
                options: {
                    lessOptions: {
                        plugins: LessPluginRemoveAntdGlobalStyles[];
                        javascriptEnabled: boolean;
                    };
                };
            })[];
            issuer?: undefined;
            type?: undefined;
            include?: undefined;
            loader?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            use: (string | {
                loader: string;
                options: {
                    modules: boolean;
                };
            })[];
            issuer?: undefined;
            type?: undefined;
            include?: undefined;
            loader?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp[];
            use: string[];
            issuer?: undefined;
            type?: undefined;
            include?: undefined;
            loader?: undefined;
        })[];
    };
    plugins: any[];
    devtool: string;
    mode: any;
    entry: string;
    output: {
        path: string;
        filename: string;
        library: string;
        libraryTarget: string;
        publicPath: string;
    };
    resolve: {
        extensions: string[];
        alias: {
            "@": string;
        };
    };
};
export = _exports;
import { LessPluginRemoveAntdGlobalStyles } from "less-plugin-remove-antd-global-styles";
//# sourceMappingURL=webpack.config.d.ts.map