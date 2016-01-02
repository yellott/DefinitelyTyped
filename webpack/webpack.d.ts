// Type definitions for webpack 1.12.2
// Project: https://github.com/webpack/webpack
// Definitions by: Qubo <https://github.com/tkqubo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "webpack" {
    namespace webpack {
        interface Configuration {
            context?: string;
            entry?: string|string[]|Entry;
            devtool?: string;
            output?: Output;
            module?: Module;
            resolve?: Resolve;
            resolveLoader?: ResolveLoader;
            externals?: ExternalsElement|ExternalsElement[];
            target?: string;
            bail?: boolean;
            profile?: boolean;
            cache?: boolean|any;
            watch?: boolean;
            watchOptions?: WatchOptions;
            debug?: boolean;
            devServer?: any; // TODO: Type this
            node?: Node;
            amd?: { [moduleName: string]: boolean };
            recordsPath?: string;
            recordsInputPath?: string;
            recordsOutputPath?: string;
            plugins?: (Plugin|Function)[];
        }

        interface Entry {
            [name: string]: string|string[];
        }

        interface Output {
            path?: string;
            filename?: string;
            chunkFilename?: string;
            sourceMapFilename?: string;
            devtoolModuleFilenameTemplate?: string;
            devtoolFallbackModuleFilenameTemplate?: string;
            devtoolLineToLine?: boolean;
            hotUpdateChunkFilename?: string;
            hotUpdateMainFilename?: string;
            publicPath?: string;
            jsonpFunction?: string;
            hotUpdateFunction?: string;
            pathinfo?: boolean;
            library?: boolean;
            libraryTarget?: string;
            umdNamedDefine?: boolean;
            sourcePrefix?: string;
            crossOriginLoading?: string|boolean;
        }

        interface Module {
            loaders?: Loader[];
            preLoaders?: Loader[];
            postLoaders?: Loader[];
            noParse?: RegExp|RegExp[];
            unknownContextRequest?: string;
            unknownContextRecursive?: boolean;
            unknownContextRegExp?: RegExp;
            unknownContextCritical?: boolean;
            exprContextRequest?: string;
            exprContextRegExp?: RegExp;
            exprContextRecursive?: boolean;
            exprContextCritical?: boolean;
            wrappedContextRegExp?: RegExp;
            wrappedContextRecursive?: boolean;
            wrappedContextCritical?: boolean;
        }

        interface Resolve {
            alias: { [key: string]: string; };
            root?: string|string[];
            modulesDirectories?: string[];
            fallback?: string|string[];
            extensions?: string[];
            packageMains?: (string|string[])[];
            packageAlias?: (string|string[])[];
            unsafeCache?: RegExp|RegExp[]|boolean;
        }

        interface ResolveLoader extends Resolve {
            moduleTemplates?: string[];
        }

        type ExternalsElement = string|RegExp|ExternalsObjectElement|ExternalsFunctionElement;

        interface ExternalsObjectElement {
            [key: string]: boolean|string;
        }

        interface ExternalsFunctionElement {
            (context: any, request: any, callback: (error: any, result: any) => void): any;
        }

        interface WatchOptions {
            aggregateTimeout?: number;
            poll?: boolean|number;
        }

        interface Node {
            console?: boolean;
            global?: boolean;
            process?: boolean;
            Buffer?: boolean;
            __filename?: boolean|string;
            __dirname?: boolean|string;
            [nodeBuiltin: string]: boolean|string;
        }

        type LoaderCondition = string|RegExp|((absPath: string) => boolean);

        interface Loader {
            exclude?: LoaderCondition|LoaderCondition[];
            include?: LoaderCondition|LoaderCondition[];
            test: LoaderCondition|LoaderCondition[];
            loader?: string;
            loaders?: string[];
            query?: {
                [name: string]: any;
            }
        }

        interface Plugin { }

        interface Webpack {
            /**
             * optimize namespace
             */
            optimize: Optimize;
            /**
             * dependencies namespace
             */
            dependencies: Dependencies;
            /**
             * Replace resources that matches resourceRegExp with newResource.
             * If newResource is relative, it is resolve relative to the previous resource.
             * If newResource is a function, it is expected to overwrite the ‘request’ attribute of the supplied object.
             */
            NormalModuleReplacementPlugin: NormalModuleReplacementPluginStatic;
            /**
             * Replaces the default resource, recursive flag or regExp generated by parsing with newContentResource,
             * newContentRecursive resp. newContextRegExp if the resource (directory) matches resourceRegExp.
             * If newContentResource is relative, it is resolve relative to the previous resource.
             * If newContentResource is a function, it is expected to overwrite the ‘request’ attribute of the supplied object.
             */
            ContextReplacementPlugin: ContextReplacementPluginStatic;
            /**
             * Don’t generate modules for requests matching the provided RegExp.
             */
            IgnorePlugin: IgnorePluginStatic;
            /**
             * A request for a normal module, which is resolved and built even before a require to it occurs.
             * This can boost performance. Try to profile the build first to determine clever prefetching points.
             */
            PrefetchPlugin: PrefetchPluginStatic;
            /**
             * Apply a plugin (or array of plugins) to one or more resolvers (as specified in types).
             */
            ResolverPlugin: ResolverPluginStatic;
            /**
             * Adds a banner to the top of each generated chunk.
             */
            BannerPlugin: BannerPluginStatic;
            /**
             * Define free variables. Useful for having development builds with debug logging or adding global constants.
             */
            DefinePlugin: DefinePluginStatic;
            /**
             * Automatically loaded modules.
             * Module (value) is loaded when the identifier (key) is used as free variable in a module.
             * The identifier is filled with the exports of the loaded module.
             */
            ProvidePlugin: ProvidePluginStatic;
            /**
             * Adds SourceMaps for assets.
             */
            SourceMapDevToolPlugin: SourceMapDevToolPluginStatic;
            /**
             * Enables Hot Module Replacement. (This requires records data if not in dev-server mode, recordsPath)
             * Generates Hot Update Chunks of each chunk in the records.
             * It also enables the API and makes __webpack_hash__ available in the bundle.
             */
            HotModuleReplacementPlugin: HotModuleReplacementPluginStatic;
            /**
             * Adds useful free vars to the bundle.
             */
            ExtendedAPIPlugin: ExtendedAPIPluginStatic;
            /**
             * When there are errors while compiling this plugin skips the emitting phase (and recording phase),
             * so there are no assets emitted that include errors. The emitted flag in the stats is false for all assets.
             */
            NoErrorsPlugin: NoErrorsPluginStatic;
            /**
             * Does not watch specified files matching provided paths or RegExps.
             */
            WatchIgnorePlugin: WatchIgnorePluginStatic;
        }

        interface Optimize {
            /**
             * Search for equal or similar files and deduplicate them in the output.
             * This comes with some overhead for the entry chunk, but can reduce file size effectively.
             * This is experimental and may crash, because of some missing implementations. (Report an issue)
             */
            DedupePlugin: optimize.DedupePluginStatic;
            /**
             * Limit the chunk count to a defined value. Chunks are merged until it fits.
             */
            LimitChunkCountPlugin: optimize.LimitChunkCountPluginStatic;
            /**
             * Merge small chunks that are lower than this min size (in chars). Size is approximated.
             */
            MinChunkSizePlugin: optimize.MinChunkSizePluginStatic;
            /**
             * Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids.
             * This make ids predictable, reduces to total file size and is recommended.
             */
            OccurenceOrderPlugin: optimize.OccurenceOrderPluginStatic;
            /**
             * Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.
             * You can pass an object containing UglifyJs options.
             */
            UglifyJsPlugin: optimize.UglifyJsPluginStatic;
            CommonsChunkPlugin: optimize.CommonsChunkPluginStatic;
            /**
             * A plugin for a more aggressive chunk merging strategy.
             * Even similar chunks are merged if the total size is reduced enough.
             * As an option modules that are not common in these chunks can be moved up the chunk tree to the parents.
             */
            AggressiveMergingPlugin: optimize.AggressiveMergingPluginStatic;
        }

        interface Dependencies {
            /**
             * Support Labeled Modules.
             */
            LabeledModulesPlugin: dependencies.LabeledModulesPluginStatic;
        }

        interface DirectoryDescriptionFilePluginStatic {
            new(file: string, files: string[]): Plugin;
        }

        interface NormalModuleReplacementPluginStatic {
            new(resourceRegExp: any, newResource: any): Plugin;
        }

        interface ContextReplacementPluginStatic {
            new(resourceRegExp: any, newContentResource?: any, newContentRecursive?: any, newContentRegExp?: any): Plugin
        }

        interface IgnorePluginStatic {
            new(requestRegExp: any, contextRegExp?: any): Plugin;
        }

        interface PrefetchPluginStatic {
            new(context: any, request: any): Plugin;
            new(request: any): Plugin;
        }

        interface ResolverPluginStatic {
            new(plugins: Plugin[], files?: string[]): Plugin;
            DirectoryDescriptionFilePlugin: DirectoryDescriptionFilePluginStatic;
            /**
             * This plugin will append a path to the module directory to find a match,
             * which can be useful if you have a module which has an incorrect “main” entry in its package.json/bower.json etc (e.g. "main": "Gruntfile.js").
             * You can use this plugin as a special case to load the correct file for this module. Example:
             */
            FileAppendPlugin: FileAppendPluginStatic;
        }

        interface FileAppendPluginStatic {
            new(files: string[]): Plugin;
        }

        interface BannerPluginStatic {
            new(banner: any, options: any): Plugin;
        }

        interface DefinePluginStatic {
            new(definitions: any): Plugin;
        }

        interface ProvidePluginStatic {
            new(definitions: any): Plugin;
        }

        interface SourceMapDevToolPluginStatic {
            new(options: any): Plugin;
        }

        interface HotModuleReplacementPluginStatic {
            new(): Plugin;
        }

        interface ExtendedAPIPluginStatic {
            new(): Plugin;
        }

        interface NoErrorsPluginStatic {
            new(): Plugin;
        }

        interface WatchIgnorePluginStatic {
            new(paths: RegExp[]): Plugin;
        }

        namespace optimize {
            interface DedupePluginStatic {
                new(): Plugin;
            }
            interface LimitChunkCountPluginStatic {
                new(options: any): Plugin
            }
            interface MinChunkSizePluginStatic {
                new(options: any): Plugin;
            }
            interface OccurenceOrderPluginStatic {
                new(preferEntry: boolean): Plugin;
            }
            interface UglifyJsPluginStatic {
                new(options?: any): Plugin;
            }
            interface CommonsChunkPluginStatic {
                new(chunkName: string, filenames?: string|string[]): Plugin;
                new(options?: any): Plugin;
            }
            interface AggressiveMergingPluginStatic {
                new(options: any): Plugin;
            }
        }

        namespace dependencies {
            interface LabeledModulesPluginStatic {
                new(): Plugin;
            }
        }
    }

    var webpack: webpack.Webpack;

    //export default webpack;
    export = webpack;
}

