import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

// counter for ids to allow for multiple editors on one page
let uniqueCounter = 0;
// declare all the built in electron objects
declare const electron: any;

@Component({
    selector: 'app-monaco-editor-wrapper',
    templateUrl: './monaco-editor-wrapper.component.html',
    styleUrls: ['./monaco-editor-wrapper.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MonacoEditorWrapperComponent),
        multi: true,
    }],
})
export class MonacoEditorWrapperComponent implements OnInit, ControlValueAccessor {

    private _editorStyle = 'width:100%;height:100%;border:1px solid grey;';
    private _appPath = '';
    private _webview: any;
    private _value = '';
    private _theme = 'vs';
    private _language = 'javascript';
    private _subject: Subject<string> = new Subject();
    private _editorInnerContainer: string = 'editorInnerContainer' + uniqueCounter++;
    private _componentInitialized = false;
    private _fromEditor = false;
    private _automaticLayout = false;
    private _editorOptions: any = {};

    @ViewChild('editorContainer') _editorContainer: ElementRef;

    /**
     * editorInitialized: function($event)
     * Event emitted when editor is first initialized
     */
    @Output() editorInitialized: EventEmitter<void> = new EventEmitter<void>();

    /**
     * editorConfigurationChanged: function($event)
     * Event emitted when editor's configuration changes
     */
    @Output() editorConfigurationChanged: EventEmitter<void> = new EventEmitter<void>();

    /**
     * editorLanguageChanged: function($event)
     * Event emitted when editor's Language changes
     */
    @Output() editorLanguageChanged: EventEmitter<void> = new EventEmitter<void>();

    /**
     * editorValueChange: function($event)
     * Event emitted any time something changes the editor value
     */
    @Output() editorValueChange: EventEmitter<void> = new EventEmitter<void>();

    /**
     * The change event notifies you about a change happening in an input field.
     * Since the component is not a native Angular component have to specifiy the event emitter ourself
     */
    @Output() change: EventEmitter<void> = new EventEmitter<void>();
    /* tslint:disable-next-line */
    propagateChange = (_: any) => { };
    onTouched = () => {
        // empty method
    }

    constructor() {
        // since accessing the window object need this check so serverside rendering doesn't fail
        if (typeof document === 'object' && !!document) {
            /* tslint:disable-next-line */
            let actAppPath: any = electron.remote.app.getAppPath();

            if (process.env.NODE_ENV === 'development') {
                if (actAppPath.indexOf('node_modules') > -1) {
                    actAppPath = actAppPath.substring(0, actAppPath.indexOf('node_modules') - 1);
                }
            }
            this._appPath = actAppPath.split('\\').join('/');
        }

    }

    /**
     * value?: string
     * Value in the Editor after async getEditorContent was called
     */
    @Input('value')
    set value(value: string) {
        this._value = value;
        if (this._componentInitialized) {
            if (this._webview.send !== undefined) {
                // don't want to keep sending content if event came from IPC, infinite loop
                if (!this._fromEditor) {
                    this._webview.send('setEditorContent', value);
                }
                this.editorValueChange.emit(undefined);
                this.propagateChange(this._value);
                this.change.emit(undefined);
                this._fromEditor = false;
            } else {
                // Editor is not loaded yet, try again in half a second
                setTimeout(() => {
                    this.value = value;
                }, 500);
            }
        }
    }

    get value(): string {
        return this._value;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     */
    writeValue(value: any): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /**
     * getEditorContent?: function
     * Returns the content within the editor
     */
    getValue(): Observable<string> {
        if (this._componentInitialized) {
            this._webview.send('getEditorContent');
            return this._subject.asObservable();
        }
    }

    /**
     * language?: string
     * language used in editor
     */
    @Input('language')
    set language(language: string) {
        this._language = language;
        if (this._componentInitialized) {
            console.log('coucou');
            this._webview.send('setLanguage', language);
        }
        console.log('test');
    }
    get language(): string {
        return this._language;
    }

    /**
     * registerLanguage?: function
     * Registers a custom Language within the editor
     */
    registerLanguage(language: any): void {
        if (this._componentInitialized) {
            this._webview.send('registerLanguage', language);
        }
    }

    /**
     * style?: string
     * css style of the editor on the page
     */
    @Input('editorStyle')
    set editorStyle(editorStyle: string) {
        this._editorStyle = editorStyle;
        if (this._componentInitialized) {
            this._webview.send('setEditorStyle', { language: this._language, theme: this._theme, style: editorStyle });
        }
    }
    get editorStyle(): string {
        return this._editorStyle;
    }

    /**
     * theme?: string
     * Theme to be applied to editor
     */
    @Input('theme')
    set theme(theme: string) {
        this._theme = theme;
        if (this._componentInitialized) {
            this._webview.send('setEditorOptions', { 'theme': theme });
        }
    }
    get theme(): string {
        return this._theme;
    }

    /**
     * automaticLayout?: boolean
     * Implemented via setInterval that constantly probes for the container's size
     */
    @Input('automaticLayout')
    set automaticLayout(automaticLayout: any) {
        this._automaticLayout = automaticLayout !== '' ? (automaticLayout === 'true' || automaticLayout === true) : true;
    }
    get automaticLayout(): any {
        return this._automaticLayout;
    }

    /**
     * editorOptions?: Object
     * Options used on editor instantiation. Available options listed here:
     * https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
     */
    @Input('editorOptions')
    set editorOptions(editorOptions: any) {
        this._editorOptions = editorOptions;
        if (this._componentInitialized) {
            this._webview.send('setEditorOptions', editorOptions);
        }
    }
    get editorOptions(): any {
        return this._editorOptions;
    }

    @Input()
    set jsonSchema(jsonSchema: Array<any>) {
        if (this._componentInitialized) {
            this._webview.send('jsonSchemaChange', jsonSchema);
        }
    }

    @Input()
    set decorations(decorations: Array<any>) {
        if (this._componentInitialized) {
            this._webview.send('decorationChange', decorations);
        }
    }

    @Input()
    set markers(markers: Array<any>) {
        if (this._componentInitialized) {
            this._webview.send('markerChange', markers);
        }
    }

    /**
     * layout method that calls layout method of editor and instructs the editor to remeasure its container
     */
    layout(): void {
        if (this._componentInitialized) {
            this._webview.send('layout');
        }
    }

    /**
     * ngOnInit only used for Electron version of editor
     * This is where the webview is created to sandbox away the editor
     */
    ngOnInit(): void {
        let editorHTML = '';
        editorHTML = `<!DOCTYPE html>
            <html style="height:100%">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
                <link rel="stylesheet" data-name="vs/editor/editor.main"
                    href="file://${this._appPath}/node_modules/monaco-editor/min/vs/editor/editor.main.css">
                <link rel="stylesheet" href="file://${this._appPath}/dist/assets/monaco/decorations.css">
            </head>
            <body style="height:100%;width: 100%;margin: 0;padding: 0;overflow: hidden;">
            <div id="${this._editorInnerContainer}" style="width:100%;height:100%;${this._editorStyle}"></div>
            <script>
                // Get the ipcRenderer of electron for communication
                const {ipcRenderer} = require('electron');
            </script>
            <script src="file://${this._appPath}/node_modules/monaco-editor/min/vs/loader.js"></script>
            <script>
                var editor;
                var theme = '${this._theme}';
                var value = '${this._value}';
                var decorations = [];

                require.config({
                    baseUrl: '${this._appPath}/node_modules/monaco-editor/min'
                });
                self.module = undefined;
                self.process.browser = true;

                require(['vs/editor/editor.main'], function() {
                    editor = monaco.editor.create(document.getElementById('${this._editorInnerContainer}'), Object.assign({
                        value: value,
                        language: '${this.language}',
                        theme: '${this._theme}',
                    }, ${JSON.stringify(this.editorOptions)}));
                    editor.getModel().onDidChangeContent( (e)=> {
                        ipcRenderer.sendToHost("onEditorContentChange", editor.getValue());
                    });
                    ipcRenderer.sendToHost("onEditorInitialized", '');
                });

                // return back the value in the editor to the mainview
                ipcRenderer.on('getEditorContent', function(){
                    ipcRenderer.sendToHost("editorContent", editor.getValue());
                });

                // set the value of the editor from what was sent from the mainview
                ipcRenderer.on('setEditorContent', function(event, data){
                    value = data;
                    editor.setValue(data);
                });

                // set the style of the editor container div
                ipcRenderer.on('setEditorStyle', function(event, data){
                    var editorDiv = document.getElementById('${this._editorInnerContainer}');
                    editorDiv.style = data.style;
                    var currentValue = editor.getValue();
                    editor.dispose();
                    editor = monaco.editor.create(document.getElementById('${this._editorInnerContainer}'), Object.assign({
                        value: currentValue,
                        language: data.language,
                        theme: data.theme,
                    }, ${JSON.stringify(this.editorOptions)}));
                });

                // set the options of the editor from what was sent from the mainview
                ipcRenderer.on('setEditorOptions', function(event, data){
                    editor.updateOptions(data);
                    ipcRenderer.sendToHost("onEditorConfigurationChanged", '');
                    if (data.theme) {
                        monaco.editor.setTheme(data.theme);
                    }
                    if (data.tabSize) {
                        editor.getModel().updateOptions({
                            tabSize: data.tabSize
                        });
                    }
                    if (data.language) {
                        monaco.editor.setModelLanguage(editor.getModel(), data.language);
                    }
                });

                // set the language of the editor from what was sent from the mainview
                ipcRenderer.on('setLanguage', function(event, data){
                    var currentValue = editor.getValue();
                    editor.dispose();
                    editor = monaco.editor.create(document.getElementById('${this._editorInnerContainer}'), Object.assign({
                        value: currentValue,
                        language: data,
                        theme: theme,
                    }, ${JSON.stringify(this.editorOptions)}));
                    ipcRenderer.sendToHost("onEditorConfigurationChanged", '');
                    ipcRenderer.sendToHost("onEditorLanguageChanged", '');
                });

                // register a new language with editor
                ipcRenderer.on('registerLanguage', function(event, data){
                    var currentValue = editor.getValue();
                    editor.dispose();

                    for (var i = 0; i < data.completionItemProvider.length; i++) {
                        var provider = data.completionItemProvider[i];
                        provider.kind = eval(provider.kind);
                    }
                    for (var i = 0; i < data.monarchTokensProvider.length; i++) {
                        var monarchTokens = data.monarchTokensProvider[i];
                        monarchTokens[0] = eval(monarchTokens[0]);
                    }
                    monaco.languages.register({ id: data.id });

                    monaco.languages.setMonarchTokensProvider(data.id, {
                        tokenizer: {
                            root: data.monarchTokensProvider
                        }
                    });

                    // Define a new theme that constains only rules that match this language
                    monaco.editor.defineTheme(data.customTheme.id, data.customTheme.theme);
                    theme = data.customTheme.id;

                    monaco.languages.registerCompletionItemProvider(data.id, {
                        provideCompletionItems: () => {
                            return data.completionItemProvider
                        }
                    });

                    var css = document.createElement("style");
                    css.type = "text/css";
                    css.innerHTML = data.monarchTokensProviderCSS;
                    document.body.appendChild(css);

                    ipcRenderer.sendToHost("onEditorConfigurationChanged", '');
                });

                // Instruct the editor to remeasure its container
                ipcRenderer.on('layout', function(){
                    editor.layout();
                });

                ipcRenderer.on('jsonSchemaChange', function(event, data){
                     monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                         validate: true,
                         schemas: data
                     });
                });

                ipcRenderer.on('decorationChange', function(event, data){
                     decorations = editor.deltaDecorations(decorations, data);
                });

                ipcRenderer.on('markerChange', function(event, data){
                     monaco.editor.setModelMarkers(editor.getModel(), null, data);
                });

                // need to manually resize the editor any time the window size
                // changes. See: https://github.com/Microsoft/monaco-editor/issues/28
                window.addEventListener("resize", function resizeEditor() {
                    editor.layout();
                });
            </script>
            </body>
            </html>`;

        // dynamically create the Electron Webview Element
        // this will sandbox the monaco code into its own DOM and its own
        // javascript instance. Need to do this to avoid problems with monaco
        // using AMD Requires and Electron using Node Requires
        // see https://github.com/Microsoft/monaco-editor/issues/90
        this._webview = document.createElement('webview');
        this._webview.setAttribute('nodeintegration', 'true');
        this._webview.setAttribute('disablewebsecurity', 'true');
        // take the html content for the webview and base64 encode it and use as the src tag
        this._webview.setAttribute('src', 'data:text/html;base64,' + window.btoa(editorHTML));
        this._webview.setAttribute('style', 'display:inline-flex; width:100%; height:100%');

        // Process the data from the webview
        this._webview.addEventListener('ipc-message', (event: any) => {
            if (event.channel === 'editorContent') {
                this._fromEditor = true;
                this.writeValue(event.args[0]);
                this._subject.next(this._value);
                this._subject.complete();
                this._subject = new Subject();
            } else if (event.channel === 'onEditorContentChange') {
                this._fromEditor = true;
                this.writeValue(event.args[0]);
            } else if (event.channel === 'onEditorInitialized') {
                this.editorInitialized.emit(undefined);
            } else if (event.channel === 'onEditorConfigurationChanged') {
                this.editorConfigurationChanged.emit(undefined);
            } else if (event.channel === 'onEditorLanguageChanged') {
                this.editorLanguageChanged.emit(undefined);
            }
        });

        // append the webview to the DOM
        this._editorContainer.nativeElement.appendChild(this._webview);
        this._componentInitialized = true;
    }
}
