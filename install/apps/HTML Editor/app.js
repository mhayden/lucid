dojo.require("dijit.Toolbar");
dojo.require("dijit.layout.LayoutContainer");
dojo.require("dojo.parser");
dojo.require("dijit.Editor");
this.newAs = false;
this.editing = false;
this.fileEditing = "";
this.init = function(args) {
	if(args.file) {
		this.start();
		this._processOpen(args.file);
	}
	else {
	this.start();
	}
}

this.kill = function() {
if(typeof(this.window) != "undefined") {
this.window.destroy();
}
api.instances.setKilled(this.instance);
}

this.start = function() {
this.window = new api.window();
this.window.setBodyWidget("LayoutContainer", {});
var toolbar = new dijit.Toolbar({layoutAlign: "top"});
toolbar.addChild(new dijit.form.Button({label: "New", onClick: dojo.hitch(this, this.processNew), iconClass: "icon-16-actions-document-open"}));
toolbar.addChild(new dijit.form.Button({label: "Open", onClick: dojo.hitch(this, this.processOpen), iconClass: "icon-16-actions-document-open"}));
toolbar.addChild(new dijit.form.Button({label: "Save", onClick: dojo.hitch(this, this.processSave), iconClass: "icon-16-actions-document-save"}));
toolbar.addChild(new dijit.form.Button({label: "Save As", onClick: dojo.hitch(this, this.processSaveAs), iconClass: "icon-16-actions-document-save-as"}));
toolbar.addChild(new dijit.form.Button({label: "Close", onClick: dojo.hitch(this, this.processClose), iconClass: "icon-16-actions-process-stop"}));
toolbar.addChild(new dijit.form.Button({label: "Exit", onClick: dojo.hitch(this, this.kill), iconClass: "icon-16-actions-system-log-out"}));
this.window.addChild(toolbar);
var box = new dijit.layout.ContentPane({layoutAlign: "client"}, document.createElement("div"));
this.other = new dijit.layout.ContentPane({layoutAlign: "bottom", style: "height: 10%"}, document.createElement("div"));
html = "<div id=\"text"+this.instance+"\" padding=10>";
html += "</div>";
box.setContent(html);
this.other.setContent("No file open");
this.window.addChild(box);
this.window.addChild(this.other);
this.window.title="HTML Editor";
this.window.width="320px";
this.window.height="305px";
this.window.show();
this.new = false;
this.window.startup();
this.editor = new dijit.Editor({id: "text"+this.instance, name:"text"+this.instance}, dojo.byId("text"+this.instance));
this.editor.replaceValue("<b>Open</b> or <b>Create</b> a file.");
this.editor.setDisabled(true);
this.status = "active";
this.window.onDestroy = dojo.hitch(this, this.kill);
}
this.processNew = function() {
this.editor.setDisabled(false);
this.editor.replaceValue("");
this.editing = false;
this.fileEditing = "";
this.newAs = true;
this.other.setContent("Editing file \"Untitled\"");
}
this.processClose = function() {
this.editor.setDisabled(true);
this.editor.replaceValue("<b>Open</b> or <b>Create</b> a file.");
this.newAs = false;
this.editing = false;
this.fileEditing = "";
this.other.setContent("No file open");
}
this.processOpen = function() {
this.other.setContent("Opened file dialog");
api.ui.fileDialog({title: "Choose a file to open", callback: dojo.hitch(this, this._processOpen)});
}

this._processOpen = function(path) {
if(path == false) { this.other.setContent("Open canceled"); return false; }
this.other.setContent("Opening file \""+path+"\"");
this.newAs = true;
dojo.byId('text'+this.instance).disabled = true;
api.fs.read({path: path, callback: dojo.hitch(this, function(array) {
this.editor.setDisabled(false);
this.editor.replaceValue(array.contents);
this.editing = true;
this.newAs = true;
this.fileEditing = array.path;
this.other.setContent("Editing file \""+array.path+"\"");
})});
}

this.processSave = function() {
if(this.editing) {
api.fs.write({path: this.fileEditing, content: this.editor.getValue()});
this.other.setContent("File saved!");
}
else {
this.processSaveAs();
}
}
this.processSaveAs = function() {
if(this.newAs) {
api.ui.fileDialog({title: "Choose a file to save as", callback: dojo.hitch(this, function(path) { if(path == false) { this.other.setContent("Save canceled"); return false; } this.editing = true; this.fileEditing = path; this.newAs = true; this.processSave(); })});
}
}
this.exit = function() {
}

