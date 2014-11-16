function Message (element) {
    var that = this;
    this.setElement = function (element) {
        element.style.visibility = "hidden";
        that.el = element;
    }

    this.hide = function (timeout) {
        setTimeout(function(){
            that.el.style.visibility = "hidden";
        }, timeout);
    }

    this.show = function(strMessage, autoHide, callback) {
        that.el.innerHTML = strMessage;
        that.el.style.visibility = "visible";

        if (autoHide) {
            that.hide(3000)
        }

        if(typeof callback == "function")  {
            callback();
        }
    }

    //Init
    if (element) {
        that.setElement(element);
    }
}
