/* global window, Image, jQuery */
/**
 * @author 360Learning
 * @author Catalin Dogaru (https://github.com/cdog - http://code.tutsplus.com/tutorials/how-to-create-a-jquery-image-cropping-plugin-from-scratch-part-i--net-20994)
 * @author Adrien David-Sivelle (https://github.com/AdrienDS - Refactoring, Multiselections & Mobile compatibility)
 */
(function($) {
    $.imageArea = function(parent, id) {
        var options = parent.options,
            $image = parent.$image,
            $trigger = parent.$trigger,
            $outline,
            $selection,
            $txt_box,
            new_created = false,
            image_width = parent.$image.width(),
            image_height = parent.$image.height(),
            STICK_DELTA = options.data.step * 0.5,
            resized = false,
            intersection,
            $resizeHandlers = {},
            $btDelete,
            card,
            resizeHorizontally = true,
            resizeVertically = true,
            offsetX = parent.offsetX, offsetY = parent.offsetY,
            limitWidth = parent.limitX, limitHeight = parent.limitY,
            selectionOffset = [0, 0],
            selectionOrigin = [parent.offsetX, parent.offsetY],
            closest_x = offsetX,
            closest_y = offsetY,
            closest_x2 = limitWidth,
            closest_y2 = limitHeight,
            area = {
                id: id,
                x: parent.offsetX,
                y: parent.offsetY,
                z: 0,
                height: 0,
                width: 0
            },
            toFixed = function(num){
                return parseFloat(num.toFixed(4));
            },
            blur = function () {
                area.z = 0;
                refresh("blur");
            },
            focus = function () {
                parent.blurAll();
                area.z = 100;
                refresh();
            },
            getRandColor = function(brightness){
                // Six levels of brightness from 0 to 5, 0 being the darkest
                var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
                var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
                var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)});
                return "rgb(" + mixedrgb.join(",") + ")";
             },
            checkIntersect = function(x, y, w, h){
                intersection = false;
                var tmp_cl_x, tmp_cl_y, tmp_cl_x2, tmp_cl_y2;
                tmp_cl_x = offsetX;
                tmp_cl_y = offsetY;
                tmp_cl_x2 = limitWidth;
                tmp_cl_y2 = limitHeight;
                if(!(resizeHorizontally && resizeVertically)){
                    if(resizeHorizontally){
                        h = area.height;
                    }else if(resizeVertically){
                        w = area.width;
                    }
                }
                $.each(parent._areas, function(i, item){
                        var area_second = item.getData();
                        if(area.id !== area_second.id ){
                            if(x < area_second.x2 - STICK_DELTA  && (x + w) > area_second.x + STICK_DELTA   && y < area_second.y2  - STICK_DELTA   && (y + h) > area_second.y  + STICK_DELTA || x < offsetX - STICK_DELTA || (x + w) > limitWidth + STICK_DELTA || y < offsetY - STICK_DELTA || (y + h) > limitHeight + STICK_DELTA){
                                intersection = true;
                            }

                            if (area_second.x2 <= x + STICK_DELTA &&  area_second.x2 > tmp_cl_x) {//check left, find x
                                tmp_cl_x = area_second.x2;
                            }
                            if (area_second.x >= x + w - STICK_DELTA && area_second.x < tmp_cl_x2) {//check right, find x2
                                tmp_cl_x2 = area_second.x;
                            }
                            if (area_second.y2 <= y + STICK_DELTA && area_second.y2 > tmp_cl_y) {//check top, find y
                                tmp_cl_y = area_second.y2;
                            }
                            if (area_second.y >= y + h - STICK_DELTA &&  area_second.y < tmp_cl_y2) {//check bottom, find y2
                                tmp_cl_y2 = area_second.y;
                            }
                        }
                    });
                if(!intersection){
                    closest_x = tmp_cl_x;
                    closest_y = tmp_cl_y;
                    closest_x2 = tmp_cl_x2;
                    closest_y2 = tmp_cl_y2;
                }

            },
            getData = function () {
                return area;
            },
            created = function (flag){
                new_created = flag;
            },
            fireEvent = function (event) {
                $image.trigger(event, [area.id, parent.areas(), parent.options.data]);
            },
            cancelEvent = function (e) {
                var event = e || window.event || {};
                event.cancelBubble = true;
                event.returnValue = false;
                event.stopPropagation && event.stopPropagation(); // jshint ignore: line
                event.preventDefault && event.preventDefault(); // jshint ignore: line
            },
            off = function() {
                $.each(arguments, function (key, val) {
                    on(val);
                });
            },
            on = function (type, handler) {
                var browserEvent, mobileEvent;
                switch (type) {
                    case "start":
                        browserEvent = "mousedown";
                        mobileEvent = "touchstart";
                        break;
                    case "move":
                        browserEvent = "mousemove";
                        mobileEvent = "touchmove";
                        break;
                    case "stop":
                        browserEvent = "mouseup";
                        mobileEvent = "touchend";
                        break;
                    default:
                        return;
                }
                if (handler && jQuery.isFunction(handler)) {
                    $(window.document).on(browserEvent, handler).on(mobileEvent, handler);
                } else {
                    $(window.document).off(browserEvent).off(mobileEvent);
                }
            },
            updateSelection = function () {
                // Update the outline layer
                $outline.css({
                    cursor: "default",
                    width: area.width,
                    height: area.height,
                    left: area.x,
                    top: area.y,
                    "z-index": area.z
                });

                // Update the selection layer
                $selection.css({
                    backgroundPosition : ( - area.x - 1) + "px " + ( - area.y - 1) + "px",
                    cursor : options.allowMove ? "move" : "default",
                    width: (area.width - 2 > 0) ? (area.width - 2) : 0,
                    height: (area.height - 2 > 0) ? (area.height - 2) : 0,
                    left : area.x + 1,
                    top : area.y + 1,
                    "z-index": area.z + 2
                });
            },
            updateResizeHandlers = function (show) {
                if (! options.allowResize) {
                    return;
                }
                if (show) {
                    $.each($resizeHandlers, function(name, $handler) {
                        var top,
                            left,
                            semiwidth = Math.round($handler.width() / 2),
                            semiheight = Math.round($handler.height() / 2),
                            vertical = name[0],
                            horizontal = name[name.length - 1];

                        if (vertical === "n") {             // ====== North* ======
                            top = - semiheight;

                        } else if (vertical === "s") {      // ====== South* ======
                            top = area.height - semiheight - 1;

                        } else {                            // === East & West ===
                            top = Math.round(area.height / 2) - semiheight - 1;
                        }

                        if (horizontal === "e") {           // ====== *East ======
                            left = area.width - semiwidth - 1;

                        } else if (horizontal === "w") {    // ====== *West ======
                            left = - semiwidth;

                        } else {                            // == North & South ==
                            left = Math.round(area.width / 2) - semiwidth - 1;
                        }

                        $handler.css({
                            display: "block",
                            left: area.x + left,
                            top: area.y + top,
                            "z-index": area.z + 1
                        });
                    });
                } else {
                    $(".select-areas-resize-handler").each(function() {
                        $(this).css({ display: "none" });
                    });
                }
            },
            updateBtDelete = function (visible) {
                if ($btDelete) {
                    $btDelete.css({
                        display: visible ? "block" : "none",
                        left: area.x + area.width + 1,
                        top: area.y - $btDelete.outerHeight() - 1,
                        "z-index": area.z + 1
                    });
                }
            },
            updateCursor = function (cursorType) {
                $outline.css({
                    cursor: cursorType
                });

                $selection.css({
                    cursor: cursorType
                });
            },
            refresh = function(sender) {
            switch (sender) {
                    case "startSelection":
                        parent._refresh();
                        updateSelection();
                        updateResizeHandlers();
                        updateBtDelete(true);
                        break;

                    case "pickSelection":
                    case "pickResizeHandler":
                        updateResizeHandlers();
                        break;

                    case "resizeSelection":
                        updateSelection();
                        updateResizeHandlers();
                        updateCursor("crosshair");
                        updateBtDelete(true);
                        break;

                    case "moveSelection":
                        updateSelection();
                        updateResizeHandlers();
                        updateCursor("move");
                        updateBtDelete(true);
                        break;

                    case "blur":
                        updateSelection();
                        updateResizeHandlers();
                        updateBtDelete();
                        break;

                    case "releaseSelection":
                    default:
                        updateSelection();
                        updateResizeHandlers(true);
                        updateBtDelete(true);
                }
            },
            startSelection  = function (event) {
                cancelEvent(event);
                var width, height;
                // Reset the selection size
                width = options.minSize[0];
                height = options.minSize[1];
                focus();
                on("move", resizeSelection);
                on("stop", releaseSelection);

                // Get the selection origin
                selectionOrigin = getMousePosition(event);
                if (selectionOrigin[0] + width > limitWidth) {
                    selectionOrigin[0] = limitWidth - width;
                }
                if (selectionOrigin[1] + height > limitHeight) {
                    selectionOrigin[1] = limitHeight - height;
                }
                checkIntersect(selectionOrigin[0], selectionOrigin[1], Math.abs(width), Math.abs(height));

                if(!intersection) {
                    area.width = options.minSize[0];
                    area.height = options.minSize[1];
                    area.x = selectionOrigin[0];
                    area.y = selectionOrigin[1];
                    area.x2 = toFixed(area.x + width);
                    area.y2 = toFixed(area.y + height);
                }else{
                    deleteSelection();
                }
                fireEvent("changing");
                refresh("startSelection");
            },
            pickSelection = function (event) {
                cancelEvent(event);
                focus();
                on("move", moveSelection);
                on("stop", releaseSelection);
                checkIntersect(area.x, area.y, area.width, area.height);
                var mousePosition = getMousePosition(event);

                // Get the selection offset relative to the mouse position
                selectionOffset[0] = mousePosition[0] - area.x;
                selectionOffset[1] = mousePosition[1] - area.y;

                refresh("pickSelection");
            },
            pickResizeHandler = function (event) {
                cancelEvent(event);
                focus();
                card = event.target.className.split(" ")[1];
                if (card[card.length - 1] === "w") {
                    selectionOrigin[0] += area.width;
                    area.x = selectionOrigin[0] - area.width;
                }
                if (card[0] === "n") {
                    selectionOrigin[1] += area.height;
                    area.y = selectionOrigin[1] - area.height;
                }
                if (card === "n" || card === "s") {
                    resizeHorizontally = false;
                } else if (card === "e" || card === "w") {
                    resizeVertically = false;
                }

                on("move", resizeSelection);
                on("stop", releaseSelection);

                refresh("pickResizeHandler");
            },
            resizeSelection = function (event) {
                cancelEvent(event);
                focus();

                var mousePosition = getMousePosition(event);

                // Get the selection size
                var height = mousePosition[1] - selectionOrigin[1],
                    width = mousePosition[0] - selectionOrigin[0],
                    x, y;


                if (Math.abs(width) < options.minSize[0]) {
                    width = (width >= 0) ? options.minSize[0] : - options.minSize[0];
                }
                if (Math.abs(height) < options.minSize[1]) {
                    height = (height >= 0) ? options.minSize[1] : - options.minSize[1];
                }

                // Test if the selection size exceeds the image bounds
                // if (selectionOrigin[0] + width < offsetX || selectionOrigin[0] + width > limitWidth) {
                //     width = - width;
                // }
                // if (selectionOrigin[1] + height < offsetY || selectionOrigin[1] + height > limitHeight) {
                //     height = - height;
                // }
              //  Test if the selection size is bigger than the maximum size (ignored if minSize > maxSize)
                if (options.maxSize[0] > options.minSize[0] && options.maxSize[1] > options.minSize[1]) {
                    if (Math.abs(width) > options.maxSize[0]) {
                        width = (width >= 0) ? options.maxSize[0] : - options.maxSize[0];
                    }

                    if (Math.abs(height) > options.maxSize[1]) {
                        height = (height >= 0) ? options.maxSize[1] : - options.maxSize[1];
                    }
                }

               width = Math.round(width / options.data.step) * options.data.step;
               height = Math.round(height / options.data.step) * options.data.step;

                if (width <= 0) { // вверх
                    width = Math.abs(width);
                    x = selectionOrigin[0] - width;
                } else { // вниз
                    x = selectionOrigin[0];
                }
                if (height <= 0) { // вверх
                    height = Math.abs(height);
                    y = selectionOrigin[1] - height;
                } else { // вниз
                    y = selectionOrigin[1];
                }


                checkIntersect(x, y, Math.abs(width), Math.abs(height));

                if (mousePosition[0] - selectionOrigin[0] < 0) {
                    if(selectionOrigin[0] - width < closest_x){
                        x = closest_x;
                        width = area.x2 - x;
                    }
                    if (x - closest_x <= STICK_DELTA) {
                        x = closest_x;
                        width = area.x2 - x;

                    }
                } else {
                    if(selectionOrigin[0] + width > closest_x2){
                        x = area.x;
                        width = closest_x2 - area.x;
                    }
                    if (closest_x2 - (x + width) <= STICK_DELTA) {
                        area.x2 = closest_x2;
                        width = area.x2 - x;

                    }
                }
                if (mousePosition[1] - selectionOrigin[1] < 0) {
                    if(selectionOrigin[1] - height < closest_y){
                        y = closest_y;
                        height = area.y2 - y;
                    }
                    if (y - closest_y <= STICK_DELTA) {
                        y = closest_y;
                        height = area.y2 - y;
                    }
                } else {
                    if(selectionOrigin[1] + height > closest_y2){
                        y = area.y;
                        height = closest_y2 - area.y;
                    }
                    if (closest_y2 - (y + height) <= STICK_DELTA) {
                        area.y2 = closest_y2;
                        height = area.y2 - y;
                    }
                }
                    // Set the selection size
                    if (resizeHorizontally) {
                        area.width = toFixed(width);
                        area.x = toFixed(x);
                        area.x2 = toFixed(area.x + area.width);
                    }
                    if (resizeVertically) {
                        area.height = toFixed(height);
                        area.y = toFixed(y);
                        area.y2 = toFixed(area.y + area.height);
                    }
                // If any aspect ratio is specified
                if (options.aspectRatio) {
                    // Calculate the new width and height
                    if ((width > 0 && height > 0) || (width < 0 && height < 0)) {
                        if (resizeHorizontally) {
                            height = Math.round(width / options.aspectRatio);
                        } else {
                            width = Math.round(height * options.aspectRatio);
                        }
                    } else {
                        if (resizeHorizontally) {
                            height = - Math.round(width / options.aspectRatio);
                        } else {
                            width = - Math.round(height * options.aspectRatio);
                        }
                    }
                    // Test if the new size exceeds the image bounds
                    if (selectionOrigin[0] + width > image_width) {
                        width = image_width - selectionOrigin[0];
                        height = (height > 0) ? Math.round(width / options.aspectRatio) : - Math.round(width / options.aspectRatio);
                    }

                    if (selectionOrigin[1] + height < 0) {
                        height = - selectionOrigin[1];
                        width = (width > 0) ? - Math.round(height * options.aspectRatio) : Math.round(height * options.aspectRatio);
                    }

                    if (selectionOrigin[1] + height > image_height) {
                        height = image_height - selectionOrigin[1];
                        width = (width > 0) ? Math.round(height * options.aspectRatio) : - Math.round(height * options.aspectRatio);
                    }

                    // Set the selection size
                    area.width = width;
                    area.height = height;
                }

                resized = true;
                fireEvent("changing");
                refresh("resizeSelection");
            },
            moveSelection = function (event) {
                cancelEvent(event);
                if (! options.allowMove) {
                    return;
                }
                focus();

                var mousePosition = getMousePosition(event);
                moveTo({
                    x: mousePosition[0] - selectionOffset[0],
                    y: mousePosition[1] - selectionOffset[1]
                });
                fireEvent("changing");
            },
            moveTo = function (point, nudge) {
                var x, y, width = area.width, height = area.height, x2, y2;

                x = point.x; y = point.y;

                if(nudge) {
                    if (typeof point.l !== 'undefined') {
                        x = area.x - options.data.step;
                    } else if (typeof point.r !== 'undefined') {
                        x = area.x + options.data.step;
                    }
                    if(typeof point.u !== 'undefined' ){
                        y = area.y - options.data.step;
                    }else if(typeof point.d !== 'undefined' ){
                        y = area.y + options.data.step;
                    }
                }else {
                    if(x >= offsetX) {
                        x = Math.round(Math.abs(x) / options.data.step) * options.data.step;
                    }
                    if (y >= offsetY) {
                        y = Math.round(Math.abs(y) / options.data.step) * options.data.step;
                    }
                }

                x2 = x + width;
                y2 = y + height;

                checkIntersect(x, y, width, height);

                if(x - closest_x <= STICK_DELTA){
                    x = closest_x;
                    x2 = x + width;
                }else if(closest_x2 - (x + width) <= STICK_DELTA){
                    x2 = closest_x2;
                    x = x2 - width;
                }
                if(y - closest_y <= STICK_DELTA){
                    y = closest_y;
                    y2 = y + height;
                }else if(closest_y2 - (y + height) <= STICK_DELTA){
                    y2 = closest_y2;
                    y = y2 - height;
                }

                area.x = toFixed(x);
                area.y = toFixed(y);
                area.x2 = toFixed(x2);
                area.y2 = toFixed(y2);
                refresh("moveSelection");

            },
            releaseSelection = function (event) {
                cancelEvent(event);
                off("move", "stop");

                // Update the selection origin
                selectionOrigin[0] = area.x;
                selectionOrigin[1] = area.y;

                // Reset the resize constraints
                resizeHorizontally = true;
                resizeVertically = true;
                if(resized){
                    fireEvent("resized");
                    resized = false;
                }

                fireEvent("changed");

                if(new_created){
                    fireEvent("created");
                    new_created = false;
                }
                refresh("releaseSelection");
            },
            deleteSelection = function (event) {
                cancelEvent(event);
                $selection.remove();
                $outline.remove();
                $.each($resizeHandlers, function(card, $handler) {
                    $handler.remove();
                });
                $btDelete.remove();
                parent._remove(id);
                if(!parent.silent) {
                    fireEvent("changed");
                }
                if(!parent.destroyed){
                    fireEvent("deleted");
                }
            },
            getElementOffset = function (object) {
                var offset = $(object).offset();

                return [offset.left, offset.top];
            },
            getMousePosition = function (event) {
                var imageOffset = getElementOffset($image);

                if (! event.pageX) {
                    if (event.originalEvent) {
                        event = event.originalEvent;
                    }

                    if(event.changedTouches) {
                        event = event.changedTouches[0];
                    }

                    if(event.touches) {
                        event = event.touches[0];
                    }
                }
                var x = event.pageX - imageOffset[0],
                    y = event.pageY - imageOffset[1];

                x = (x < offsetX) ? offsetX : (x > limitWidth) ? limitWidth : x;
                y = (y < offsetY) ? offsetY : (y > limitHeight) ? limitHeight : y;
                return [x, y];
            };


        // Initialize an outline layer and place it above the trigger layer
        $outline = $("<div class=\"select-areas-outline\" />")
            .css({
                opacity : options.outlineOpacity,
                position : "absolute"
            })
            .insertAfter($trigger);

        // Initialize a selection layer and place it above the outline layer
        $selection = $("<div />")
            .addClass("select-areas-background-area")
            .css({
                background : "#fff url(" + $image.attr("src") + ") no-repeat",
                backgroundSize : $image.width() + "px",
                position : "absolute"
            })
            .insertAfter($outline);

        $txt_box = $("<div />").attr('id', 'txt_box-'+id).css({
            position: "absolute",
            width: "40px",
            background: getRandColor(3),
            left: "5px",
            top: "5px",
            fontSize: '10px'
        }).appendTo($selection);

        // Initialize all handlers
        if (options.allowResize) {
            $.each(["nw", "n", "ne", "e", "se", "s", "sw", "w"], function (key, card) {
                $resizeHandlers[card] =  $("<div class=\"select-areas-resize-handler " + card + "\"/>")
                    .css({
                        opacity : 0.5,
                        position : "absolute",
                        cursor : card + "-resize"
                    })
                    .insertAfter($selection)
                    .mousedown(pickResizeHandler)
                    .bind("touchstart", pickResizeHandler);
            });
        }
        // initialize delete button
        if (options.allowDelete) {
            var bindToDelete = function ($obj) {
                $obj.click(deleteSelection)
                    .bind("touchstart", deleteSelection)
                    .bind("tap", deleteSelection);
                return $obj;
            };
            $btDelete = bindToDelete($("<div class=\"delete-area\" />"))
                .append(bindToDelete($("<div class=\"select-areas-delete-area\" />")))
                .insertAfter($selection);
        }

        if (options.allowMove) {
            $selection.mousedown(pickSelection).bind("touchstart", pickSelection);
        }

        focus();

        return {
            getData: getData,
            startSelection: startSelection,
            deleteSelection: deleteSelection,
            created: created,
            options: options,
            blur: blur,
            focus: focus,
            nudge: function (point) {
                point.x = area.x;
                point.y = area.y;
                if (point.d) {
                    point.y = area.y + point.d;
                }
                if (point.u) {
                    point.y = area.y - point.u;
                }
                if (point.l) {
                    point.x = area.x - point.l;
                }
                if (point.r) {
                    point.x = area.x + point.r;
                }
                moveTo(point, true);
                fireEvent("changed");
            },
            set: function (dimensions, silent) {
                area = $.extend(area, dimensions);
                selectionOrigin[0] = area.x;
                selectionOrigin[1] = area.y;
                area.x2 = toFixed(area.x + area.width);
                area.y2 = toFixed(area.y + area.height);
                if (! silent) {
                    fireEvent("changed");
               }
            },
            contains: function (point) {
                return (point.x >= area.x) && (point.x <= area.x + area.width) &&
                       (point.y >= area.y) && (point.y <= area.y + area.height);
            }
        };
    };


    $.imageSelectAreas = function() { };

    $.imageSelectAreas.prototype.init = function (object, customOptions) {
        var that = this,
            defaultOptions = {
                allowEdit: true,
                allowMove: true,
                allowResize: true,
                allowSelect: true,
                allowDelete: true,
                allowNudge: true,
                aspectRatio: 0,
                minSize: [0, 0],
                maxSize: [0, 0],
                width: 0,
                maxAreas: 0,
                outlineOpacity: 0.5,
                overlayOpacity: 0.5,
                areas: [],
                onChanging: null,
                onChanged: null
            };
        this.destroyed = false;
        this.options = $.extend(defaultOptions, customOptions);

        if (! this.options.allowEdit) {
            this.options.allowSelect = this.options.allowMove = this.options.allowResize = this.options.allowDelete = false;
        }

        this._areas = {};

        // Initialize the image layer
        this.$image = $(object);

        this.ratio = 1;
        if (this.options.width && this.$image.width() && this.options.width !== this.$image.width()) {
            this.ratio = this.options.width / this.$image.width();
            this.$image.width(this.options.width);
        }

        if (this.options.onChanging) {
            this.$image.on("changing", this.options.onChanging);
        }
        if (this.options.onResized) {
            this.$image.on("resized", this.options.onResized);
        }
        if (this.options.onCreated) {
            this.$image.on("created", this.options.onCreated);
        }
        if (this.options.onDeleted) {
            this.$image.on("deleted", this.options.onDeleted);
        }
        if (this.options.onChanged) {
            this.$image.on("changed", this.options.onChanged);
        }
        if (this.options.onLoaded) {
            this.$image.on("loaded", this.options.onLoaded);
        }
        this.offsetX = this.options.data.offsetX;
        this.offsetY = this.options.data.offsetY;
        this.limitX = this.options.data.limitX;
        this.limitY = this.options.data.limitY;
        // Initialize an image holder
        this.$holder = $("<div />")
            .css({
                position : "relative",
                width: this.$image.width(),
                height: this.$image.height(),
                margin: "0 auto"
            });

        // Wrap the holder around the image
        this.$image.wrap(this.$holder).css({
            position : "absolute"
        });

        // Initialize an overlay layer and place it above the image
        this.$overlay = $("<div class=\"select-areas-overlay\" />")
            .css({
                opacity : this.options.overlayOpacity,
                position : "absolute",
                width: this.$image.width(),
                height: this.$image.height()
            })
            .insertAfter(this.$image);

        // Initialize a trigger layer and place it above the overlay layer
        this.$trigger = $("<div />") // calculate width and height from Pic obj
            .css({
                backgroundColor : "#000000",
                opacity : 0,
                position : "absolute",
                width: this.options.data.img_w,
                height: this.options.data.img_h,
                margin: 'auto',
                top: 0,
                left:0,
                bottom:0,
                right:0,
                "z-index": 1
            })
            .insertAfter(this.$overlay);
        this.$boundary = $("<div />") // calculate width and height from Pic obj
            .css({
                position : "absolute",
                width: this.options.data.img_w,
                height: this.options.data.img_h,
                margin: 'auto',
                top: 0,
                left:0,
                bottom:0,
                right:0,
                border: '1px red dashed',
                "z-index": 0
            }).insertAfter(this.$trigger);
        $.each(this.options.areas, function (key, area) {
            that._add(area, true);
        });

        this.blurAll();
        this._refresh();

        if (this.options.allowSelect) {
            // Bind an event handler to the "mousedown" event of the trigger layer
            this.$trigger.mousedown($.proxy(this.newArea, this)).on("touchstart", $.proxy(this.newArea, this));
        }
        if (this.options.allowNudge) {
            $('html').keydown(function (e) { // move selection with arrow keys
                var codes = {
                        37: "l",
                        38: "u",
                        39: "r",
                        40: "d"
                    },
                    direction = codes[e.which],
                    selectedArea;

                if (direction) {
                    e.preventDefault();
                    that._eachArea(function (area) {
                        if (area.getData().z === 100) {
                            selectedArea = area;
                            return false;
                        }
                    });
                    if (selectedArea) {
                        var move = {};
                        move[direction] = 1;
                        selectedArea.nudge(move);
                    }
                }
            });
        }

    };

    $.imageSelectAreas.prototype._refresh = function () {
        var nbAreas = this.areas().length;
        this.$overlay.css({
            display : nbAreas? "block" : "none"
        });
        if (nbAreas) {
            this.$image.addClass("blurred");
        } else {
            this.$image.removeClass("blurred");
        }
        this.$trigger.css({
            cursor : this.options.allowSelect ? "crosshair" : "default"
        });
    };
    $.imageSelectAreas.prototype.obj_sort = function(obj, param){
            var obj_sorted = obj.sort(function(a,b){
                if (a[param] < b[param]) {
                    return 1;
                }
                if (a[param] > b[param]) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            });
            return obj_sorted;
    };
    $.imageSelectAreas.prototype._eachArea = function (cb) {
        $.each(this._areas, function (id, area) {
            if (area) {
                return cb(area, id);
            }
        });
    };

    $.imageSelectAreas.prototype._remove = function (id) {
        delete this._areas[id];
        this._refresh();
    };

    $.imageSelectAreas.prototype.remove = function (id) {
        if (this._areas[id]) {
            this._areas[id].deleteSelection();
        }
    };

    $.imageSelectAreas.prototype.newArea = function (event, id) {
        this.blurAll();

        if(typeof id === 'undefined' ) {
            var id = -1;
            if (this.options.maxAreas && this.options.maxAreas <= this.areas().length) {
                return id;
            }
            this._eachArea(function (area, index) {
                id = Math.max(id, parseInt(index, 10));
            });
            id += 1;
        }

        this._areas[id] = $.imageArea(this, id);
        if (typeof event !== 'undefined') {
            this._areas[id].startSelection(event);
            if(typeof this._areas[id] !== 'undefined') {
                this._areas[id].created(true);
            }
        }
        return id;
    };

    $.imageSelectAreas.prototype.set = function (id, options, silent) {
        if (this._areas[id]) {
            var that = this;
            options.id = id;
            this._areas[id].set(options, silent);
            this._areas[id].focus();
        }
    };

    $.imageSelectAreas.prototype._add = function (options, silent) {
        var id;
        if(typeof options.id !== 'undefined'){
            id = options.id;
            this.newArea(undefined, id);
        }else{
            id = this.newArea();
        }
        if(this.offsetX){
            options.x += this.offsetX;
        }
        if(this.offsetY){
            options.y += this.offsetY;
        }
        this.set(id, options, silent);
    };

    $.imageSelectAreas.prototype.add = function (options) {
        var that = this;
        this.blurAll();
        if ($.isArray(options)) {
            $.each(options, function (key, val) {
                that._add(val);
            });
        } else {
            this._add(options);
        }
        this._refresh();
        if (! this.options.allowSelect && ! this.options.allowMove && ! this.options.allowResize && ! this.options.allowDelete) {
            this.blurAll();
        }
    };

    $.imageSelectAreas.prototype.reset = function () {
        var that = this;
        this._eachArea(function (area, id) {
            that.remove(id);
        });
        this._refresh();
    };

    $.imageSelectAreas.prototype.destroy = function (silent) {
        if(silent){
            this.silent = true;
        }
        this.destroyed = true;
        this.reset();
        this.$holder.remove();
        this.$overlay.remove();
        this.$trigger.remove();
        this.$boundary.remove();
        this.$image.css("position", "").unwrap();
        this.$image.removeData("mainImageSelectAreas");
        this.$image.off('created deleted changing changed loaded resized');
    };

    $.imageSelectAreas.prototype.areas = function () {
        var ret = [];
        this._eachArea(function (area) {
            ret.push(area.getData());
        });
        return ret;
    };

    $.imageSelectAreas.prototype.relativeAreas = function () {
        var areas = this.areas(),
            ret = [],
            ratio = this.ratio,
            scale = function (val) {
                return Math.floor(val / ratio);
            };

        for (var i = 0; i < areas.length; i++) {
            ret[i] = $.extend({}, areas[i]);
            ret[i].x = scale(ret[i].x);
            ret[i].y = scale(ret[i].y);
            ret[i].width = scale(ret[i].width);
            ret[i].height = scale(ret[i].height);
        }
        return ret;
    };

    $.imageSelectAreas.prototype.blurAll = function () {
        this._eachArea(function (area) {
            area.blur();
        });
    };

    $.imageSelectAreas.prototype.contains  = function (point) {
        var res = false;
        this._eachArea(function (area) {
            if (area.contains(point)) {
                res = true;
                return false;
            }
        });
        return res;
    };

    $.selectAreas = function(object, options) {
        var $object = $(object);
        if (! $object.data("mainImageSelectAreas")) {
            var mainImageSelectAreas = new $.imageSelectAreas();
            mainImageSelectAreas.init(object, options);
            $object.data("mainImageSelectAreas", mainImageSelectAreas);
            $object.trigger("loaded",[null, options.areas, options.data]);
        }
        return $object.data("mainImageSelectAreas");
    };


    $.fn.selectAreas = function(customOptions) {
        if ( $.imageSelectAreas.prototype[customOptions] ) { // Method call
            var ret = $.imageSelectAreas.prototype[ customOptions ].apply( $.selectAreas(this), Array.prototype.slice.call( arguments, 1 ));
            return typeof ret === "undefined" ? this : ret;

        } else if ( typeof customOptions === "object" || ! customOptions ) { // Initialization
            //Iterate over each object
            this.each(function() {
                var currentObject = this,
                    image = new Image();
                // And attach selectAreas when the object is loaded
                image.onload = function() {
                    $.selectAreas(currentObject, customOptions);
                };

                // Reset the src because cached images don"t fire load sometimes
                image.src = currentObject.src;

            });
            return this;

        } else {
            $.error( "Method " +  customOptions + " does not exist on jQuery.selectAreas" );
        }
    };
}) (jQuery);
