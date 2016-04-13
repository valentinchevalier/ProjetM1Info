function Workspace(title, nb_column){
    this.title = title;
    this.nb_column = nb_column;

    this.editing = false;
    this.beforeEditing = "test";

    this.bgColor = "#eeeeee";


    this.widgets = [];

    for (var i = 0; i < this.nb_column; i++) {
        this.widgets[i] = [];
    }
    this.column_width = (100/this.nb_column);

}

Workspace.prototype.startEditing = function(ev){

    this.beforeEditing = this.title;
    this.editing = true;

    /*var input = $(ev.currentTarget).find('input');

    input.focus();*/
}

Workspace.prototype.stopEditing = function(){
    if (this.title == ""){
        this.title = this.beforeEditing;
        this.beforeEditing = "";
    }
    this.editing = false;
}

Workspace.prototype.containsWidgets = function(){
    var ret = false;
    for (var i = 0; i < this.widgets.length; i++){
        if (this.widgets[i].length > 0){
            ret = true;
        }
    }
    console.log("Contains widget : "+ret);
    return ret;
}

Workspace.prototype.moveWidget = function (columnFrom,positionFrom,columnTo,positionTo){
    var widget = this.widgets[columnFrom][positionFrom]
    this.deleteWidget(columnFrom, positionFrom);
    this.addWidget(columnTo, positionTo, widget);
};

// TODO À modifier pour recuperer le type du widget ajouté
Workspace.prototype.addNewWidget = function(column, position, data){
    // Ajout du widget dans les widgets

    var widget;

    switch (data.type) {
        case 'tisseo_prochains_passages' :
            widget = new WidgetTisseo();
            break;
        case 'post_it' :
            widget = new WidgetPostIt();
            break;
        case 'agenda_culturel' :
            widget = new WidgetAgendaCulturel();
            break;
        case 'weather_toulouse' :
            widget = new WidgetWeather();
            break;
        case 'velo_toulouse' :
            widget = new WidgetVelib();
            break;
        default:
            widget = new Widget(data.name, data.color, "./partials/widgets/widget_base.html");
    }
    this.widgets[column].splice(position, 0, widget);
};

Workspace.prototype.initWidgets = function(widgetsData){
    var that = this;
    angular.forEach(widgetsData, function(widgetData){
        console.log(widgetData);
        var widget;
        switch(widgetData.type_widget){
            case 'tisseo_prochains_passages' :
                widget = new WidgetTisseo();
                break;
            case 'post_it' :
                widget = new WidgetPostIt();
                break;
            case 'agenda_culturel' :
                widget = new WidgetAgendaCulturel();
                break;
            case 'velo_toulouse' :
                widget = new WidgetVelib();
                break;
            default:
                widget = new Widget(data.name, data.color, "./partials/widgets/widget_base.html");
        }
        widget.setParams(widgetData.params);
        that.addWidget(widgetData.col, widgetData.position, widget);
    });
}

Workspace.prototype.addWidget = function(column, position, widget){
    this.widgets[column].splice(position, 0, widget);
};
Workspace.prototype.addWidgetWithoutPosition = function(column, widget){
    this.addWidget(column, this.widgets[column.length], widget);
};
Workspace.prototype.addWidgetsToColumn = function(widgets, column){
    for (var i = 0; i < widgets.length; i++){
        this.addWidgetWithoutPosition(column, widgets[i]);
    }
}

Workspace.prototype.deleteWidget = function(column, position){
    this.widgets[column].splice(position, 1);
};

Workspace.prototype.addWidgetWithoutPosition = function(column, widget){
    this.addWidget(column, this.widgets[column.length], widget);
};


Workspace.prototype.isColumnEmpty = function (index){
    return this.widgets[index].length == 0;
};

Workspace.prototype.addColumn = function (){
    this.nb_column++;
    this.widgets.push([]);
    this.column_width = (100/this.nb_column);
};

Workspace.prototype.removeColumn = function (index){
    this.nb_column--;
    var widgets = this.widgets[index];
    if (index==0){
        this.addWidgetsToColumn(widgets, index+1);
    } else {
        this.addWidgetsToColumn(widgets, index-1);
    }
    this.widgets.splice(index, 1);
    this.column_width = (100/this.nb_column);
};

Workspace.prototype.isFull = function (){
    return this.widgets.length >= 5;
};
Workspace.prototype.setBgColor = function (color){
    this.bgColor = color;
};
