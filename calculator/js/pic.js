var Pic = function(img){
    var self = this;
    this.img = img || null;
    this.defaults = {
        min_size: Pic_Settings.min_size,
        max_size: Pic_Settings.max_size,
        max_switch_frame: Pic_Settings.max_switch_frame,
        max_switch_square: Pic_Settings.max_switch_square,
        print_margin_0: 0,
        print_margin_1: Pic_Settings.print_margin_1,
        print_margin_2: Pic_Settings.print_margin_2,
        max_canvas_height: window.screen.width < 700 ? 400 : 610,
        EPSILON: 0.5,
        file_id: '',
        lak_type: 'no_lak',
        material: 'synt',
        frame: 1,
        outer_frame: 'no_frame',
        stretch: 'gallery',
        synt_type: 'matte',
        quantity : 1,
        product_type: 'picture',
        edit_min_step: 1, //in cm
        split_type: 'no_gaps',
        mod_space: 1.5
};
    this.init_get_params = {
        init_get_status: false,
        w_init: Pic_Settings.init_get_params.w_init,
        h_init: Pic_Settings.init_get_params.h_init,
        effects_status: Pic_Settings.init_get_params.effects_status,
        edited_status:  Pic_Settings.init_get_params.edited_status,
        edited_segments_init: Pic_Settings.init_get_params.edited_segments_init,
        effects: {
            grayScale:  Pic_Settings.init_get_params.effects.grayScale,
            sepia: Pic_Settings.init_get_params.effects.sepia,
            contrast: Pic_Settings.init_get_params.effects.contrast,
            mirror: Pic_Settings.init_get_params.effects.mirror
        }
};
    this.containers = {
        width: $("#pic_width_inp"),
        height: $("#pic_height_inp"),
        cart_block: $('.cart'),
        parts_txt_block: $('#pic_parts'),
        mod_parts_block: $('#parts_mods'),
        main_img_block: $('#main_img'),
        preset_sizes: $('#preset_sizes'),
        interiors: $('.interior-modal'),
        active_part: '',
        files: $('.preview input[name="file_id"]'),
        stretch: $('#stretch_section input'),
        lak_type: $('#lak_section input'),
        lak_block: $("#lak_block"),
        material: $('#material_section input'),
        material_block: $('#material_block'),
        synt_type: $('#synt_type_section input'),
        quantity: $('.plus-minus'),
        frame: $('#frame_section input'),
        frame_block: $('#frame_block'),
        outer_frame_block: $('#outer_frame_block'),
        outer_frame: $('#outer_frame_section input'),
        price: $('.price-new'),
        price_block: $('.price_container'),
        edit_img_block: $('#edit_mods'),
        edit_img_obj: $('#edit_mods_img'),
        slider: $('#dims-slider'),
        slider_block: $('#dims-slider-container'),
        split_type: $('input[name="split_type"]'),
        mod_space: $('#split-type-slider'),
        canvas: $('#main_canvas'),
        canvas_effects: $("#canvas-effects"),
        effects_block: $('#control-buttons'),
        product_type: $('#product_type_section input'),
        tableTotal: {
            pic_type: $('#td_pic_type > a'),
            mod_type: $('#td_mod_type > a'),
            dimensions: $('#td_dimensions > a'),
            segments: $('#td_segments > a'),
            material: $('#td_material > a'),
            frame: $('#td_frame > a'),
            lak: $('#td_lak > a'),
            outer_frame: $('#td_outer_frame > a')
        },
        buttons:{
            module: $('.mod_part[data-pic_type="module"]'),
            single: $('.mod_part[data-pic_type="single"]'),
            module_main: $('#module_type'),
            single_main: $('#single_type'),
            effects: $('.control-buttons'),
            edit_open: $('#edit_open'),
            edit_close: $('#edit_close'),
            presets: '', //dynamic
            cart: $('#button-cart'),
            show_split: $('#show_split'),
            quantity_plus: $('#superplus'),
            quantity_minus: $('#superminus'),
            one_click_cart: $('#one_click'),
            mod_parts: $('.mod_part')
        }
    };
    this.states = {
        mod_edit_open: '',
        split_open:'',
        ms_timer:{},
        effects:''
    };
    this.data = {
        product_id: Pic_Settings.data.product_id,
        file_id: '',
        aspect: '',
        mod_type: Pic_Settings.data.mod_type,
        flat_img: Pic_Settings.data.flat_img,
        print_margin: '',
        split_type: '',
        mod_space:'',
        segments: [],
        minWidth: {
        rel: '',
            abs: ''
        },
        maxWidth: {
            rel: '',
                abs: ''
        },
        minHeight: {
            rel: '',
                abs: ''
        },
        maxHeight: {
            rel: '',
                abs: ''
        },
        dims: {
            width: '',// total
                height: '',
                realWidth: '', //max - min points
                realHeight: ''
        },
        parts:{
            W: [],
                H: []
        },
       lak_status: '',
        lak_type: '',
        material: '',
        stretch: '',
        synt_type: '',
        frame: '',
        outer_frame: '',
        bf_flag: '',
        quantity: '',
        edited_status: '',
        effects_status: '',
        effect: {
        grayScale: '',
            sepia: '',
            contrast: '',
            mirror: ''
        },
        price_one: '',
        price_total: '',
        product_type:'',
        special: Pic_Settings.data.special,
        special_id: Pic_Settings.data.special_id
};
    this.init = function(e){
        var min_sizes, max_sizes, obj, int_timer;
        this.data.file_id = this.containers.files.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.file_id;
        this.data.lak_type = this.containers.lak_type.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.lak_type;
        this.data.material = this.containers.material.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.material;
        this.data.synt_type = this.containers.synt_type.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.synt_type;
        this.data.frame = parseInt(this.containers.frame.filter(function (i, el) {
            return $(el).is(':checked')
        }).val()) || self.defaults.frame;
        this.data.outer_frame = this.containers.outer_frame.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.outer_frame;
        this.data.stretch = this.containers.stretch.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.stretch;
        this.data.product_type = this.containers.product_type.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.product_type;
        this.data.split_type = this.containers.split_type.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.split_type;
        this.data.mod_space = this.containers.mod_space.filter(function (i, el) {
            return $(el).is(':checked')
        }).val() || self.defaults.mod_space;
        this.data.quantity = parseInt(this.containers.quantity.val()) || self.defaults.quantity;

        this.data.flat_img = parseInt(this.data.product_id) ? this.data.flat_img : this.img.src;

        this.containers.active_part = $('.mod_part.active');

        this.data.aspect = parseInt(this.data.product_id) ? Pic_Settings.data.aspect : this.img.width/this.img.height;

        this.editBlockStyling(); //based on flat img aspect

        this.data.segments = this.parseInitGetParams(e); //checks, sets init_get_status and gets segments

        if(!this.init_get_params.init_get_status && this.data.segments.length === 0){
            this.data.segments = this.parseActiveEl(this.containers.active_part);
        }

        this.effectsInit(); //based on int get status
        this.editedInit(); //based on int get status

        this.data.minWidth.rel = this.findMinMaxEl(this.data.segments, 'min', 'w');
        this.data.minHeight.rel = this.findMinMaxEl(this.data.segments, 'min', 'h');
        this.data.maxWidth.rel = this.findMinMaxEl(this.data.segments, 'max', 'w');
        this.data.maxHeight.rel = this.findMinMaxEl(this.data.segments, 'max', 'h');

        //changes this.data.min/max Width/Height.abs values
        min_sizes = this.calcMinMaxSizes('min');
        max_sizes = this.calcMinMaxSizes('max');

        this.sliderInit(min_sizes.width, max_sizes.width);

        //creates real size segments and sets dimensions
        obj = this.realSizeSegsCreate();

        this.set(obj, 'segments'); //sets segments!
        this.set(this.data.segments, 'total_dims');

        int_timer = setInterval(function(){
            if(self.states.effects !== 'loading'){
                clearInterval(int_timer);
                self.defferedLaunch('interiors',self.interiorsCreate, true);
            }
        }, 500);

        this.viewController();

        this.manageStage();

        this.init_get_params.init_get_status = false; //turn initGet state off after 1st init

        this.calcPresetSizes();

        this.events_init();

    };
    this.sliderInit = function(min, max){
        var dims_range_slider = this.containers.slider.data("ionRangeSlider");
        if(typeof dims_range_slider !== 'undefined' && dims_range_slider !== null){
            dims_range_slider.update({
                min: min,
                max: max,
                from: min
            });
        }else {
            this.containers.slider.ionRangeSlider({
                min: min,
                max: max,
                from: min,
                step: 1,
                grid_snap: false,
                grid_margin: true,
                grid_num: 10,
                grid: true,
                hide_from_to: true,
                hide_min_max: true,
                skin: 'big',
                onChange: function (data) {
                    inputs_change(data['from']);
                },
                onFinish: function () {
                    self.containers.width.trigger('blur');
                }
            });
        }
        function inputs_change(v){
            self.containers.width.val(v);
        }
    };
    this.findMinMaxEl = function(obj, flag, param){
        var arr = [], result;
        for(var i = 0; i < obj.length; i++){
            if(obj[i].visible){
                arr[i] = obj[i][param];
            }
        }
        arr = arr.filter(function (el) {
            return el != null;
        });
        result = (flag === 'min') ? parseFloat(Math.min.apply(null, arr)) : parseFloat(Math.max.apply(null, arr));
        return result;
    };
    this.maxLastRowsCols = function(obj){
        var max_rows = 0, max_cols = 0;
        for(var i = 0; i < obj.length; i++){
            if(obj[i].visible && obj[i].lastY){
               if( obj[i].rows > max_rows){
                   max_rows = obj[i].rows;
               }
            }
            if(obj[i].visible && obj[i].lastX){
                if( obj[i].cols > max_cols){
                    max_cols = obj[i].cols;
                }
            }
        }
        return {'max_rows': max_rows, 'max_cols': max_cols};
    };
    this.realDimensions = function(obj){
        var dim_obj = { }, total_dims = { }, visible_dims = { };
        obj.forEach(function(item, i){
            if(self.objLength(total_dims) === 0){
                total_dims.max_x = item.abs.x2; total_dims.min_x = item.abs.x1; total_dims.max_y = item.abs.y2; total_dims.min_y = item.abs.y1;
            }
            if(item.abs.x1 < total_dims.min_x){
                total_dims.min_x = item.abs.x1;
            }
            if(item.abs.x2 > total_dims.max_x){
                total_dims.max_x = item.abs.x2;
            }
            if(item.abs.y1 < total_dims.min_y){
                total_dims.min_y = item.abs.y1;
            }
            if(item.abs.y2 > total_dims.max_y){
                total_dims.max_y = item.abs.y2;
            }
            if(item.visible) {
                if(self.objLength(visible_dims) === 0){
                    visible_dims.max_x = item.abs.x2; visible_dims.min_x = item.abs.x1; visible_dims.max_y = item.abs.y2; visible_dims.min_y = item.abs.y1;
                }
                if(item.abs.x1 < visible_dims.min_x){
                    visible_dims.min_x = item.abs.x1;
                }
                if(item.abs.x2 > visible_dims.max_x){
                    visible_dims.max_x = item.abs.x2;
                }
                if(item.abs.y1 < visible_dims.min_y){
                    visible_dims.min_y = item.abs.y1;
                }
                if(item.abs.y2 > visible_dims.max_y){
                    visible_dims.max_y = item.abs.y2;
                }
            }
        });
        dim_obj.total_dims = total_dims;
        dim_obj.visible_dims = visible_dims;

        dim_obj.width = Math.round(dim_obj.total_dims.max_x);
        dim_obj.height = Math.round(dim_obj.total_dims.max_y);

        dim_obj.realWidth = Math.round(dim_obj.visible_dims.max_x - dim_obj.visible_dims.min_x);
        dim_obj.realHeight = Math.round(dim_obj.visible_dims.max_y - dim_obj.visible_dims.min_y);

        return dim_obj;
    };
    this.findEmptySquares = function(obj, w, h){
        var x_arr = [], y_arr = [], point = {x:'', y:''}, joined_arr,
            squares_arr = [],  epsilon = self.defaults.EPSILON ;
        x_arr.push(0, w); //add start and end of coords net
        y_arr.push(0, h);

        for(var i = 0; i < obj.length; i++){
            x_arr.push(obj[i].abs.x1, obj[i].abs.x2);
            y_arr.push(obj[i].abs.y1, obj[i].abs.y2);
        }
        x_arr.sort(function(a, b) {
            return a - b;
        });
        x_arr = x_arr.filter(function(item, pos, arr) { // remove each element equal to the preceding one
            return (!pos || item !== arr[pos - 1]);
        });
        for(var x_i = 0; x_i < x_arr.length; x_i++){ // remove element if difference less than epsilon (this shouldnt be but for safety)
            if(x_arr[x_i] + epsilon > x_arr[x_i + 1]){
                x_arr.splice(x_i + 1, 1);
                x_i--;
            }
        }

        y_arr.sort(function(a, b) {
            return a - b;
        });
        y_arr = y_arr.filter(function(item, pos, arr) {
            return (!pos || item !== arr[pos - 1]);
        });
        for(var y_i = 0; y_i < y_arr.length; y_i++){
            if(y_arr[y_i] + epsilon > y_arr[y_i + 1]){
                y_arr.splice(y_i + 1, 1);
                y_i--;
            }
        }

        if(x_arr.length > 0 || y_arr.length > 0) {
            for (var j = 0; j < x_arr.length - 1; j++) {
                for (var k = 0; k < y_arr.length - 1; k++) {
                    point.x = x_arr[j] + (x_arr[j + 1] - x_arr[j]) / 2;
                    point.y = y_arr[k] + (y_arr[k + 1] - y_arr[k]) / 2;

                    if (!point_intersects(point)) {
                        squares_arr.push({ abs:
                                {
                                    x1: x_arr[j], x2: x_arr[j + 1],
                                    y1: y_arr[k], y2: y_arr[k + 1],
                                    w: self.toFixed(x_arr[j + 1] - x_arr[j]),
                                    h: self.toFixed(y_arr[k + 1] - y_arr[k])
                                },
                            x1: self.toFixed(x_arr[j] / w),
                            y1: self.toFixed(y_arr[k] / h),
                            w: self.toFixed( (x_arr[j + 1] - x_arr[j]) / w ),
                            h: self.toFixed( (y_arr[k + 1] - y_arr[k]) / h ),
                            visible: false
                        });
                    }
                }
            }
            joined_arr = squares_join(squares_arr);
            obj = obj.concat(joined_arr);
        }

        return obj;

        function point_intersects(point){
            for(var i = 0; i < obj.length; i++) {
                if(point.x >= obj[i].abs.x1 && point.x <= obj[i].abs.x2 && point.y >= obj[i].abs.y1 && point.y <= obj[i].abs.y2){
                    return true;
                }
            }
            return false;
        }

        function squares_join(squares_arr){
            var join = false, index_r, index_b, index_rb, arr = squares_arr;
            for(var i = 0; i < squares_arr.length; i++) {
                for (var j = 0; j < squares_arr.length; j++) {
                    if (i !== j && squares_arr[i].abs.x2 === squares_arr[j].abs.x1 && squares_arr[i].abs.y1 === squares_arr[j].abs.y1 && squares_arr[i].abs.h === squares_arr[j].abs.h) { //check right
                        index_r = j;
                        join = true;
                    }
                    if (i !== j && squares_arr[i].abs.y2 === squares_arr[j].abs.y1 && squares_arr[i].abs.x1 === squares_arr[j].abs.x1 && squares_arr[i].abs.w === squares_arr[j].abs.w) { //check bottom
                        index_b = j;
                        join = true;
                    }
                }
                if(typeof(index_r) !== 'undefined' && typeof(index_b) !== 'undefined'){ //можно ли расширить по диагонали
                    for(var z = 0; z < squares_arr.length; z++) {
                        if(z !== i &&  squares_arr[z].abs.x1 ===  squares_arr[i].abs.x2 &&  squares_arr[z].abs.x2 ===  squares_arr[index_r].abs.x2 && squares_arr[z].abs.y2 === squares_arr[index_b].abs.y2){
                            index_rb = z;
                            break;
                        }
                    }
                }

                if(typeof(index_rb) !== 'undefined'){
                    squares_arr[i].abs.x2 = squares_arr[index_r].abs.x2;
                    squares_arr[i].abs.y2 = squares_arr[index_b].abs.y2;
                    squares_arr[i].abs.w = squares_arr[i].abs.w + squares_arr[index_r].abs.w;
                    squares_arr[i].abs.h = squares_arr[i].abs.h + squares_arr[index_b].abs.h;
                    squares_arr[i].x2 = self.toFixed(squares_arr[i].abs.x2 / w);
                    squares_arr[i].y2 = self.toFixed(squares_arr[i].abs.y2 / h);
                    squares_arr[i].w = self.toFixed(squares_arr[i].abs.w / w);
                    squares_arr[i].h = self.toFixed(squares_arr[i].abs.h / h);

                    arr = squares_arr.filter(function(value, index, arr){  // удалить 3 квадрата
                        return (index !== index_r && index !== index_b && index !== index_rb);
                    });
                    break;
                }else if(typeof(index_r) !== 'undefined'){
                    squares_arr[i].abs.x2 = squares_arr[index_r].abs.x2;
                    squares_arr[i].abs.w = squares_arr[i].abs.w + squares_arr[index_r].abs.w;
                    squares_arr[i].x2 = self.toFixed(squares_arr[i].abs.x2 / w);
                    squares_arr[i].w = self.toFixed(squares_arr[i].abs.w / w);
                    squares_arr.splice(index_r, 1);
                    break;
                }else if(typeof(index_b) !== 'undefined'){
                    squares_arr[i].abs.y2 = squares_arr[index_b].abs.y2;
                    squares_arr[i].abs.h = squares_arr[i].abs.h + squares_arr[index_b].abs.h;
                    squares_arr[i].y2 = self.toFixed(squares_arr[i].abs.y2 / h);
                    squares_arr[i].h = self.toFixed(squares_arr[i].abs.h / h);
                    squares_arr.splice(index_b, 1);
                    break;
                }
            }

            if(join){
                arr = squares_join(arr);
            }
            return arr;
        }
    };
    this.realSizeSegsCreate = function(width, height, edit_mods){
        var w, h, arr = JSON.parse(JSON.stringify(this.data.segments));
        if(this.init_get_params.init_get_status || edit_mods) { //if sent data in get params
            if(edit_mods){
                w = width;
                h = height;
            }else {
                w = (this.init_get_params.w_init >= this.data.minWidth.abs && this.init_get_params.w_init <= this.data.maxWidth.abs) ? this.init_get_params.w_init : this.data.minWidth.abs;
                h = (this.init_get_params.h_init >= this.data.minHeight.abs && this.init_get_params.h_init <= this.data.maxHeight.abs) ? this.init_get_params.h_init : this.data.minHeight.abs;
            }
            this.data.segments.forEach(function (item, i) {
                arr[i].abs = { };
                arr[i].abs.x1 = self.round(item.x1 * w);
                arr[i].abs.y1 = self.round(item.y1 * h);
                arr[i].abs.w = self.round(item.w * w);
                arr[i].abs.h = self.round(item.h * h);
                arr[i].abs.x2 = self.round(item.x1 * w) + self.round(item.w * w);
                arr[i].abs.y2 = self.round(item.y1 * h) +self.round(item.h * h);
                arr[i].cols = 0;
                arr[i].rows = 0;
            });
            arr = this.findEmptySquares(arr, w, h);
            this.setIds(arr);
            this.colsRows(arr);
            this.modObjScan(arr); //sets links, equality, last xy
        }else{  //if parse from element || on relative resize
            w = width || this.data.minWidth.abs; h = height || this.data.minHeight.abs;
            this.data.segments.forEach(function (item, i) {
                arr[i].abs = { };
                arr[i].abs.x1 = self.toFixed(item.x1 * w);
                arr[i].abs.y1 = self.toFixed(item.y1 * h);
                arr[i].abs.w =  self.toFixed(item.w * w);
                arr[i].abs.h =  self.toFixed(item.h * h);
                arr[i].abs.x2 = self.toFixed(item.x1 * w + item.w * w);
                arr[i].abs.y2 = self.toFixed(item.y1 * h + item.h * h);
                arr[i].cols = 0;
                arr[i].rows = 0;
            });
            if(this.data.edited_status) {
                arr = this.findEmptySquares(arr, w, h);
            }
            this.setIds(arr);
            this.colsRows(arr);
            this.modObjScan(arr); //sets links, equality, last xy
            arr.forEach(function(item, i){ //rounds values
                arr[i].abs.w=(arr.length === 1) ? self.round(item.abs.w) : self.ceil(item.abs.w);
                arr[i].abs.h=(arr.length === 1) ? self.round(item.abs.h) : self.ceil(item.abs.h);
                arr[i].abs.x2= self.toFixed(item.abs.x1 + item.abs.w);
                arr[i].abs.y2= self.toFixed(item.abs.y1 + item.abs.h);
            });
            this.posTransform(arr);
            if(!this.data.edited_status){
                this.objSort(arr, 'x2','abs');
                this.equalityCorrect(arr, 'x2', true);
                this.equalityCorrect(arr, 'x2', false);

                this.objSort(arr, 'y2','abs');
                this.equalityCorrect(arr, 'y2', true);
                this.equalityCorrect(arr, 'y2', false);
            }
        }

        return arr;
    };
    this.setIds = function(arr){
        var vis_count = 0, invis_count = 0;
        this.objSort(arr, 'x1', 'abs');
        arr.forEach(function(item, i){
            if(item.visible){
                vis_count++;
                item.id = vis_count;
            }
        });
        arr.forEach(function(item, i){
            if(!item.visible){
                invis_count++;
                item.id = vis_count + invis_count;
            }
        })
    };
    this.set = function(obj, flag, options){
        switch (flag){
            case 'segments':
                var parts = '', bf_flag = false;
                this.data.segments = obj;
                this.objSort(this.data.segments, 'id');
                this.data.parts.W = []; this.data.parts.H = [];
                this.data.segments.forEach(function (item, i) {
                    if(item.visible) {
                        self.data.parts.W.push(self.round(item.abs.w));
                        self.data.parts.H.push(self.round(item.abs.h));
                        if(!bf_flag && self.checkFrameSwitch(item.abs.w, item.abs.h)){
                            bf_flag = true;
                        }
                        parts += '<p><span style="font-weight: 600; color: #757575;">Сегмент № ' + (item.id) + ':</span> ' + self.round(item.abs.w) + ' x ' + self.round(item.abs.h) + ' см.</p>';
                    }
                });
                self.data.bf_flag = bf_flag;
                self.containers.parts_txt_block.html(parts);
                break;
            case 'total_dims':
                var dims = this.realDimensions(obj);
                this.data.dims.width = dims.width;
                this.data.dims.height = dims.height;
                this.data.dims.realWidth = dims.realWidth;
                this.data.dims.realHeight = dims.realHeight;
                this.data.dims.total_dims = dims.total_dims;
                this.data.dims.visible_dims = dims.visible_dims;
                this.changeInputs([this.containers.width, this.containers.height], [this.data.dims.width, this.data.dims.height]);
                self.containers.slider.data("ionRangeSlider").update({
                    from: self.data.dims.width
                });
                break;
        }
    };
    this.checkFrameSwitch = function(w, h){
        return !!(w > self.defaults.max_switch_frame || h > self.defaults.max_switch_frame || (w * h) / 10000 >= self.defaults.max_switch_square); //todo
    };
    this.changeInputs = function(items, val){ //recieves array
        items.forEach(function(item, i){
            item.val(val[i]);
        });
    };
    this.objSort = function(obj, param, sub_obj){ //by abs
        obj.sort(function(a,b){
            var obj_a = typeof (sub_obj) !== 'undefined' ? a[sub_obj][param] : a[param],
                obj_b = typeof (sub_obj) !== 'undefined' ? b[sub_obj][param] : b[param];
            if (obj_a > obj_b) {
                return 1;
            }
            if (obj_a < obj_b) {
                return -1;
            }
            return 0;
        });
    };
    this.colsRows = function(obj){ // in abs only!!! sets cols and rows
        this.objSort(obj, 'x1', 'abs');
        colsRowsProceed(obj, 'cols');
        this.objSort(obj, 'y1', 'abs');
        colsRowsProceed(obj, 'rows');

        function colsRowsProceed(obj, flag){
            obj.forEach(function(item, i){
                if(item.visible) {
                    obj.forEach(function (item2, i2) {
                        if (item2.visible) {
                            if (flag === 'cols') {
                                if (i2 !== i && item2.abs.x1 < item.abs.x1 && item2.abs.x2 <= item.abs.x1 + self.defaults.EPSILON && item2.abs.y2 > item.abs.y1 && item2.abs.y1 < item.abs.y2) {
                                    if ( (item2.abs.x2 + item2.cols * self.data.mod_space >= item.abs.x1) && item2.cols >= item.cols) {
                                        if(item2.abs.x2 > item.abs.x1 - self.defaults.EPSILON && item2.abs.x2 < item.abs.x1 + self.defaults.EPSILON){
                                            item.cols = item2.cols + 1;
                                        }else {
                                            item.cols = Math.ceil((item2.abs.x2 + item2.cols * self.data.mod_space) - item.abs.x1);
                                        }
                                    }
                                }
                            } else {
                                if (i2 !== i && item2.abs.y1 < item.abs.y1 &&  item2.abs.y2 <= item.abs.y1 + self.defaults.EPSILON && item2.abs.x2 > item.abs.x1 && item2.abs.x1 < item.abs.x2) {
                                    if ( (item2.abs.y2 + item2.rows * self.data.mod_space >= item.abs.y1) && item2.rows >= item.rows) {
                                        if(item2.abs.y2 > item.abs.y1 - self.defaults.EPSILON && item2.abs.y2 < item.abs.y1 + self.defaults.EPSILON){
                                            item.rows = item2.rows + 1;
                                        }else {
                                            item.rows = Math.ceil((item2.abs.y2 + item2.rows * self.data.mod_space) - item.abs.y1);
                                        }
                                    }
                                }
                            }
                        }
                    });
                }else{
                    item.cols = 0;
                    item.rows = 0;
                }
            });
        }
    };
    this.modObjScan = function(obj){ // in abs only!!! sets links, equality, last xy
        var id;
        obj.forEach(function(item, i){
            item.links = {
                x1: { },
                x2: { },
                y1:{ },
                y2: { }
            };
            item.equality = [];
            item.lastX = true;
            item.lastY = true;

            obj.forEach(function(item2, i2){
                if(i2 !== i) {
                    id = item2.id;

                    if ( item.abs.x1 >= (item2.abs.x2 - self.defaults.EPSILON) && item.abs.x1 <= (item2.abs.x2 + self.defaults.EPSILON) ) {
                        item.links.x1[id] = 'x2';
                    } else if ( item.abs.x1 >= (item2.abs.x1 - self.defaults.EPSILON) && item.abs.x1 <= (item2.abs.x1 + self.defaults.EPSILON) ) {
                        item.links.x1[id] = 'x1';
                    }
                    if ( item.abs.x2 <= (item2.abs.x1 + self.defaults.EPSILON) && item.abs.x2 >= (item2.abs.x1 - self.defaults.EPSILON) ) {
                        item.links.x2[id] = 'x1';
                    } else if ( item.abs.x2 >= (item2.abs.x2 - self.defaults.EPSILON) && item.abs.x2 <= (item2.abs.x2 + self.defaults.EPSILON) ) {
                        item.links.x2[id] = 'x2';
                    }
                    if ( item.abs.y1 >= (item2.abs.y2 - self.defaults.EPSILON) && item.abs.y1 <= (item2.abs.y2 + self.defaults.EPSILON) ) {
                        item.links.y1[id] = 'y2';
                    } else if ( item.abs.y1 >= (item2.abs.y1 - self.defaults.EPSILON) && item.abs.y1 <= (item2.abs.y1 + self.defaults.EPSILON) ) {
                        item.links.y1[id] = 'y1';
                    }
                    if ( item.abs.y2 <= (item2.abs.y1 + self.defaults.EPSILON) && item.abs.y2 >= (item2.abs.y1 - self.defaults.EPSILON) ) {
                        item.links.y2[id] = 'y1';
                    } else if ( item.abs.y2 >= (item2.abs.y2 - self.defaults.EPSILON) && item.abs.y2 <= (item2.abs.y2 + self.defaults.EPSILON) ) {
                        item.links.y2[id] = 'y2';
                    }
                    // equality
                    if(item.abs.w === item2.abs.w && item.abs.h === item2.abs.h && item.visible  && item2.visible){
                        item.equality.push(item2.id);
                    }
                    if(item.abs.w === item2.abs.w && item.abs.h === item2.abs.h && !item.visible && !item2.visible){
                        item.equality.push(item2.id);
                    }
                }
                if(item.lastX && item.visible && item2.visible){
                    if(item2.abs.x2 > item.abs.x2 && i2 !== i){
                        item.lastX = false;
                    }
                }
                if(item.lastY && item.visible && item2.visible){
                    if(item2.abs.y2 > item.abs.y2 && i2 !== i){
                        item.lastY = false;
                    }
                }
                if(item.lastX && !item.visible){
                    if(item2.abs.x2 > item.abs.x2 && i2 !== i){
                        item.lastX = false;
                    }
                }
                if(item.lastY && !item.visible){
                    if(item2.abs.y2 > item.abs.y2 && i2 !== i){
                        item.lastY = false;
                    }
                }
            });
        });
    };
    this.toFixed = function(num){
        return parseFloat(num.toFixed(4));
    };
    this.ceil = function (num) {
        return Math.ceil(num);
    };
    this.round = function (num) {
        return Math.round(num);
    };
    this.parseActiveEl = function(el){
        var arr = [], w_sizes = [], h_sizes = [], x_pos = [], y_pos = [], cols = [], rows = [], visibility = [], segs_count;
        if(el.data('pic_type') === 'module'){
            segs_count = el.data('w_sizes').split(',').length;
            w_sizes = el.data('w_sizes').split(',');
            h_sizes = el.data('h_sizes').split(',');
            x_pos = el.data('x_pos').split(',');
            y_pos = el.data('y_pos').split(',');
            cols = el.data('cols').split(',');
            rows = el.data('rows').split(',');
            visibility = el.data('visibility').split(',');
            for(var i = 0; i < segs_count; i++){
                arr[i] = { };
                arr[i].x1 = parseFloat(x_pos[i]);
                arr[i].y1 = parseFloat(y_pos[i]);
                arr[i].w = parseFloat(w_sizes[i]);
                arr[i].h = parseFloat(h_sizes[i]);
                arr[i].visible = !!parseFloat(visibility[i]);
            }
        }else{
            arr[0] = { };
            arr[0].x1 = parseFloat(el.data('x_pos'));
            arr[0].y1 = parseFloat(el.data('y_pos'));
            arr[0].w = parseFloat(el.data('w_sizes'));
            arr[0].h = parseFloat(el.data('h_sizes'));
            arr[0].cols = parseFloat(el.data('cols'));
            arr[0].rows = parseFloat(el.data('rows'));
            arr[0].visible = !!parseFloat(el.data('visibility'));
        }
        return arr;
    };
    this.parseInitGetParams = function(e){ //check init get params and returns init segments in percents
        this.init_get_params.init_get_status = false;
        if(!e){
            var w_init = this.init_get_params.w_init, h_init = this.init_get_params.h_init, arr = [], arr2=[], x_perc, y_perc, w_perc, h_perc;
            if(parseInt(w_init) && parseInt(h_init)) {
                this.init_get_params.init_get_status = true;
                arr = this.init_get_params.edited_segments_init;
                    for (var i = 0; i < arr.length; i++) {
                        x_perc = arr[i].x / w_init;
                        y_perc = arr[i].y / h_init;
                        w_perc = arr[i].w / w_init;
                        h_perc = arr[i].h / h_init;
                        if (x_perc >= 0 && x_perc <= 1 && y_perc >= 0 && y_perc <= 1 && w_perc >= 0 && w_perc <= 1 && h_perc >= 0 && h_perc <= 1) {
                            arr2[i] = { };
                            arr2[i].x1 = this.toFixed(x_perc);
                            arr2[i].y1 = this.toFixed(y_perc);
                            arr2[i].w = this.toFixed(w_perc);
                            arr2[i].h = this.toFixed(h_perc);
                            arr2[i].visible = true;
                        } else {
                            this.init_get_params.init_get_status = false;
                            return [];
                        }
                    }
            }else{
                arr2 =  this.parseActiveEl(this.containers.active_part);
            }
            return arr2;
        }
        return [];
    };
    this.calcMinMaxSizes = function(flag){
        var w = 0, h = 0,
            totalSize = {
                width: 0,
                height: 0
            };

        if (flag === 'min') {
            if ( this.data.minHeight.rel <   this.data.minWidth.rel * this.data.aspect ) {
                h = this.defaults.min_size / this.data.minHeight.rel;
                w = h * this.data.aspect;
            } else if ( this.data.minHeight.rel >  this.data.minWidth.rel * this.data.aspect ) {
                w = this.defaults.min_size / this.data.minWidth.rel;
                h = w / this.data.aspect;
            } else {
                if (this.data.minWidth.rel >= this.data.minHeight.rel) {
                    w = h = this.defaults.min_size / this.data.minHeight.rel;
                } else if (this.data.minWidth.rel < this.data.minHeight.rel) {
                    w = h = this.defaults.min_size / this.data.minWidth.rel;
                }
            }
            this.data.minWidth.abs = Math.round(w);
            this.data.minHeight.abs = Math.round(h);
        } else {
            if (this.data.maxHeight.rel < this.data.aspect * this.data.maxWidth.rel) {
                w = this.defaults.max_size / this.data.maxWidth.rel;
                h = w / this.data.aspect;
            } else if (this.data.maxHeight.rel > this.data.aspect * this.data.maxWidth.rel) {
                h = this.defaults.max_size / this.data.maxHeight.rel;
                w = h * this.data.aspect;
            } else {
                if (this.data.maxWidth.rel >= this.data.maxHeight.rel) {
                    w = h = this.defaults.max_size / this.data.maxWidth.rel;
                } else if (this.data.maxWidth.rel < this.data.maxHeight.rel) {
                    w = h = this.defaults.max_size / this.data.maxHeight.rel;
                }
            }
            this.data.maxWidth.abs = Math.round(w);
            this.data.maxHeight.abs = Math.round(h);
        }
        totalSize.width = Math.round(w);
        totalSize.height = Math.round(h);
        return totalSize;
    };
    this.getById = function(obj, id){
        for(var j =0; j < obj.length; j++){
            if(obj[j].id === parseFloat(id)){
                return obj[j];
            }
        }
    };
    this.posTransform = function(obj){
        this.objSort(obj, 'x1','abs');
        transform(obj, 'x1');
        transform(obj, 'x2');
        this.objSort(obj, 'y1','abs');
        transform(obj, 'y1');
        transform(obj, 'y2');

        function transform(obj, flag){
            obj.forEach(function(item, i){
                for(key in item.links){
                    for(key2 in item.links[key]){
                        if(item.links[key][key2] === flag) {
                            move_by_id(item, key, key2, item.links[key][key2]);
                        }
                    }
                }
            });
        }
        function move_by_id(base_obj, base_coord, second_obj_id, second_coord){
            var second_obj = self.getById(obj, second_obj_id);
            // console.log('base_obj_id: ' + base_obj.id, 'second_obj_id: ' + second_obj_id);
            // if( ((second_coord ==='x1' || second_coord ==='y1') && base_obj[base_coord] > second_obj[second_coord] - Pic.EPSILON*size) || ((second_coord ==='x2' || second_coord ==='y2') && base_obj[base_coord] > second_obj[second_coord])  ) {
            // console.log(second_obj_id + ': ' + second_coord +'('+ second_obj[second_coord] +')' +'--> ' + base_coord +'('+ base_obj[base_coord] +')');
            if( base_obj.abs[base_coord] > second_obj.abs[second_coord] ) {

                second_obj.abs[second_coord] = base_obj.abs[base_coord];

                if (second_coord === 'x1') {
                    // console.log(second_obj_id + ': x2('+ second_obj.x2 +')' +'--> ' + (second_obj.x1 + second_obj.w));
                    second_obj.abs.x2 = second_obj.abs.x1 + second_obj.abs.w;
                } else if (second_coord === 'x2') {
                    // console.log(second_obj_id + ': w('+ second_obj.w +')' +'--> ' + (second_obj.x2 - second_obj.x1));

                    second_obj.abs.w = second_obj.abs.x2 - second_obj.abs.x1;
                }
                if (second_coord === 'y1') {
                    // console.log(second_obj_id + ': y2('+ second_obj.y2 +')' +'--> ' + (second_obj.y1 + second_obj.h));

                    second_obj.abs.y2 = second_obj.abs.y1 + second_obj.abs.h;
                } else if (second_coord === 'y2') {
                    // console.log(second_obj_id + ': h('+ second_obj.h +')' +'--> ' + (second_obj.y2 - second_obj.y1));

                    second_obj.abs.h = second_obj.abs.y2 - second_obj.abs.y1;
                }
            }
        }
    };
    this.equalityCorrect = function(obj, coord, visible){
        var opposite_coord, h_w, delta, linked_obj, eq_obj;

        if(coord === 'y2') {
            opposite_coord = 'y1';
            h_w = 'h';
        }else if(coord === 'x2'){
            opposite_coord = 'x1';
            h_w = 'w';
        }
        obj.forEach(function (item, i) {
            if(item.visible === visible && item.equality.length > 0) {
                item.equality.forEach(function (item2, i2) {
                    eq_obj = self.getById(obj, item2);
                    if (eq_obj.abs[h_w] > item.abs[h_w]) {
                        delta = eq_obj.abs[h_w] - item.abs[h_w];
                        eq_obj.abs[opposite_coord] = eq_obj.abs[opposite_coord] + delta;
                        eq_obj.abs[h_w] = eq_obj.abs[coord] - eq_obj.abs[opposite_coord];
                        for (key in eq_obj.links) {
                            if (key === opposite_coord) {
                                for (key2 in eq_obj.links[key]) {
                                    linked_obj = self.getById(obj, key2);
                                    linked_obj.abs[eq_obj.links[key][key2]] += delta;
                                    linked_obj.abs[h_w] = linked_obj.abs[coord] - linked_obj.abs[opposite_coord];
                                }
                            }
                        }
                    }
                });
            }
        });
    };
    this.calcPresetSizes = function(){
        var presetArray = [ ], max_cells = 9, j = 0, w, h, curr_obj, dims,
            step = ( (this.data.maxWidth.abs - this.data.minWidth.abs) / (max_cells-1) ),
            html='';

        for ( w = this.data.minWidth.abs; w <= this.data.maxWidth.abs; w += step) {
            w = Math.round(w);
            h = this.toFixed(w / this.data.aspect);
            curr_obj = this.realSizeSegsCreate(this.round(w),this.round(h));
            dims = this.realDimensions(curr_obj);

            presetArray[j] = { };
            presetArray[j].w_real = this.round(dims.realWidth);
            presetArray[j].w_data = this.toFixed(w);
            presetArray[j].h_real = this.round(dims.realHeight);
            presetArray[j].h_data = this.toFixed(h);
            j++;
        }

        var filteredArr = presetArray.filter(function(item, pos, arr) {
            return !pos || (item.w_real !== arr[pos - 1].w_real);
        });
        filteredArr.forEach(function (item, i) {
            html += '<div class="preset_sizes" data-w="' + item.w_data + '" data-h="' + item.h_data + '">' + item.w_real + 'x' + item.h_real + '</div>';
        });
        this.containers.preset_sizes.html(html);
        this.containers.buttons.presets = $('.preset_sizes');
        this.events.presets();
        return presetArray;
    };
    this.objLength = function(obj){
        return Object.keys(obj).length;
    };
    this.imgsLoad = function(sources){
        var promises = [], imgs_obj = { };

        function loadImage(src, key) {
            return new Promise(function(resolve,reject) {
                var image = new Image();
                image.src = src;
                image.onload = function() {
                    resolve(image);
                };
                image.onerror = function(e) {
                    reject(e);
                };
                imgs_obj[key] = image;
            })
        }
        for(var src in sources) {
            promises.push(loadImage(sources[src], src));
        }

        return Promise.all(promises).then(function() {
            return imgs_obj;
        });
    };
    this.canvasMainCreate = function(){
        var obj = this.data.segments, ctx = this.containers.canvas[0].getContext('2d'), max_cols, max_rows,
            mod_space = self.data.mod_space, correct_x, correct_y, font_height, img_sources,
            max_rows_cols, total_abs_width, total_abs_height, koeff_resize, data;
        ctx.canvas.width = this.containers.canvas.parent().width()*0.95;
        ctx.canvas.height = self.defaults.max_canvas_height;
        max_rows_cols = self.maxLastRowsCols(obj);
        total_abs_width = this.data.dims.realWidth + max_rows_cols['max_cols'] * mod_space;
        total_abs_height = this.data.dims.realHeight + max_rows_cols['max_rows'] * mod_space;
        koeff_resize = (total_abs_width / total_abs_height < ctx.canvas.width / ctx.canvas.height) ? this.toFixed(ctx.canvas.height / total_abs_height) : this.toFixed(ctx.canvas.width / total_abs_width);
        koeff_resize = koeff_resize * 0.9; //scale
        correct_y = (ctx.canvas.height - total_abs_height * koeff_resize)/2;//центрируем по y
        correct_x = (ctx.canvas.width - total_abs_width * koeff_resize)/2; //центрируем по x

        font_height = (this.round(0.08*(total_abs_width * koeff_resize)) > 15) ? 15 : this.round(0.06*(total_abs_width * koeff_resize));
        img_sources = {
            img: this.data.effects_status ? this.containers.edit_img_obj.attr('src') : this.data.flat_img,
            bg: Pic_Settings.canv_bg_img
        };
        data = {
            ctx: ctx,
            img_src : img_sources,
            canv_koeff_resize: koeff_resize,
            correct_x: correct_x,
            correct_y: correct_y,
            font_height: font_height,
            shadow_blur: 0.01*ctx.canvas.width,
            shadow_offsetX: 0.005*ctx.canvas.width,
            shadow_offsetY: 0.005*ctx.canvas.width,
            mod_space: mod_space,
            alpha: 0.5,
            text_draw: true,
            max_rows_cols: max_rows_cols
        };
        this.imgsLoad(img_sources).then(function(result) {
            data.img_src = result;
            self.canvasRender_cb(data);
            self.spinnerRemove('canvas');
        });
    };
    this.interiorsCreate = function(){
        var obj = self.data.segments, img_sources, data, max_rows_cols, total_abs_width, total_abs_height, total_abs_aspect, koeff_resize,
            canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'),
            mod_space = self.data.mod_space, correct_x, correct_y, ready_image;

        max_rows_cols = self.maxLastRowsCols(obj);
        total_abs_width = self.data.dims.realWidth +  max_rows_cols['max_cols'] * mod_space + 2*mod_space; //добавляем два mod_space для тени
        total_abs_height = self.data.dims.realHeight + max_rows_cols['max_rows'] * mod_space + 2*mod_space;
        total_abs_aspect = total_abs_width / total_abs_height;
        if(total_abs_aspect >= 1){
            ctx.canvas.width = 500;
            ctx.canvas.height = ctx.canvas.width / total_abs_aspect;
            koeff_resize = ctx.canvas.width / total_abs_width;
        }else{
            ctx.canvas.height = 500;
            ctx.canvas.width = ctx.canvas.height * total_abs_aspect;
            koeff_resize = ctx.canvas.height / total_abs_height;
        }

        correct_y = (ctx.canvas.height - total_abs_height*koeff_resize)/2;//центрируем по y
        correct_x = (ctx.canvas.width - total_abs_width*koeff_resize)/2; //центрируем по x

        img_sources = {
            img: self.data.effects_status ? self.containers.edit_img_obj.attr('src') : self.data.flat_img
        };
        data = {
            ctx: ctx,
            img_src : '',
            canv_koeff_resize: koeff_resize,
            correct_x: correct_x,
            correct_y: correct_y,
            font_height: 15,
            shadow_blur: mod_space*koeff_resize/1.3,
            shadow_offsetX: mod_space*koeff_resize/1.7,
            shadow_offsetY: mod_space*koeff_resize/1.7,
            mod_space: mod_space,
            alpha: 0.43,
            text_draw: false,
            max_rows_cols: max_rows_cols
        };
        self.imgsLoad(img_sources)
            .then(function(result){
                data.img_src = result;
                self.canvasRender_cb(data);
            }).then(function(){
            var img_front_elem, img_back_elem, aspect_int_back, abs_W, abs_H;
           // ready_image = canvas.toDataURL();
            ctx.canvas.toBlob(function(blob) {
                self.containers.interiors.each(function(index, value){
                    var css_w = 99, css_h = 99;
                    var ready_image = URL.createObjectURL(blob, blob.type);
                    img_front_elem = $(this).find('img.interior-modal-front');
                    img_back_elem = $(this).find('img.interior-modal-background');
                    aspect_int_back = parseFloat(img_back_elem.data('region_aspect'));
                    abs_W = parseInt(img_back_elem.data('abs_w'));
                    abs_H = parseInt(img_back_elem.data('abs_h'));

                    if((ctx.canvas.width / ctx.canvas.height) >= aspect_int_back){
                        if(self.data.dims.realWidth * 1.05 <= abs_W){ //1.05 cause of shadows margins
                            css_w = Math.round(css_w * (self.data.dims.realWidth * 1.05) / abs_W);
                        }
                        img_front_elem.css({'width': css_w+'%', 'height':''});
                    }else{
                        if(self.data.dims.realHeight * 1.05 <= abs_H){
                            css_h = Math.round(css_h * (self.data.dims.realHeight * 1.05) / abs_H);
                        }
                        img_front_elem.css({'height': css_h+'%', 'width':''});
                    }
                    img_front_elem.attr('src', ready_image); //insert image

                    self.interiorsInit();

                });
                self.spinnerRemove('interiors');
            });
        });
    };
    this.interiorsInit = function(){
        $('.thumbnails_int').each(function() {
            var $container = $(this), $imageLinks = $container.find('.dataitem'), data = [ ], base_elem;

            $imageLinks.each(function (index, value){
                var wrap = $('<div class="white-popup" onclick="magnificPopup.next()"></div>');

                base_elem = $(value).clone();

                base_elem.find(".spinner").css("display","none");
                base_elem.css({"pointer-events": "", "cursor": "pointer"});

                base_elem.find('img.interior-modal-background').attr('src', base_elem.find('img.interior-modal-background').data('orig'));
                data[index] = {
                    src: wrap.html(base_elem),
                    type: 'inline'
                }
            });

            $imageLinks.magnificPopup({
                mainClass: 'mfp-fade',
                preloader: true,
                items:data,
                gallery:{
                    enabled:true
                },
                callbacks: {
                    beforeOpen: function() {
                        var index = $imageLinks.index(this.st.el);
                        if (-1 !== index) {
                            this.goTo(index);
                        }
                    },
                    open: function() {
                        window.magnificPopup = $.magnificPopup.instance;
                    }
                }

            });
        });

    };
    this.flip = function(type){
        var $imageObj = self.containers.edit_img_obj;
        if ($imageObj.data("mainImageSelectAreas")) {
            if(type === 'flip_v'){
                $.each($imageObj.selectAreas('areas'), function (i, item) {
                    var dims = item;
                    dims.y = $imageObj.height() - item.y - item.height;
                    $imageObj.selectAreas('set', item.id, dims, false)
                });
            }else if(type === 'flip_h'){
                $.each($imageObj.selectAreas('areas'), function (i, item) {
                    var dims = item;
                    dims.x = $imageObj.width() - item.x - item.width;
                    $imageObj.selectAreas('set', item.id, dims, false)
                });
            }
        }
    };
    this.effectsInit = function(){
        self.containers.buttons.effects.filter('.pushed').removeClass('pushed');

        self.data.effects_status = self.init_get_params.init_get_status && this.init_get_params.effects_status;

        for(var key in self.data.effect){
            if(self.init_get_params.init_get_status){
                self.data.effect[key] = self.init_get_params.effects[key];
                if(self.data.effect[key]) {
                    self.containers.buttons.effects.filter('[data-effect*="' + key + '"]').addClass('pushed');
                }
            }else{
                self.data.effect[key] = false;
            }
        }
        this.effectsApply();
    };
    this.addEffect = function(obj, e_type){
        $(obj).toggleClass('pushed');

        if(e_type === 'mirror'){
            self.data.effect[e_type] = !self.data.effect[e_type];
        }else{
            self.containers.buttons.effects.filter('.single').not(obj).removeClass('pushed');
            for (var key in self.data.effect) {
                if (e_type === key) {
                    self.data.effect[key] = !self.data.effect[key];
                } else if (key !== 'mirror') {
                    self.data.effect[key] = false;
                }
            }
        }
        this.effectsApply(e_type);
    };
    this.effectsApply = function(e_type){
        var effects_cnt = 0, counter = 0;
        for (var key in self.data.effect){
            if(self.data.effect[key] !== false){
                effects_cnt++;
            }
        }
        if(effects_cnt) {
            self.data.effects_status = true;
            self.states.effects = 'loading';
            self.containers.canvas_effects.canvasLayout({
                'grayScale': self.data.effect['grayScale'],
                'sepia': self.data.effect['sepia'],
                'contrast': self.data.effect['contrast'],
                'mirror': self.data.effect['mirror'],
                'img': [self.containers.edit_img_obj.data('orig_img')],
                'onComplete': function (dataUrl) {
                    counter++;
                    if(effects_cnt === counter) {
                        self.containers.edit_img_obj.attr('src', dataUrl);
                        self.states.effects = 'loaded';
                        self.viewController();
                    }
                }
            });
        }else{
            self.data.effects_status = false;
            self.containers.edit_img_obj.attr('src', self.containers.edit_img_obj.data('orig_img'));
            if(e_type) {
                self.viewController();
            }
        }
    };
    this.editedInit = function(){
        self.data.edited_status = this.init_get_params.init_get_status && this.init_get_params.edited_status;
    };
    this.canvasRender_cb = function(data){
        var obj = self.data.segments, ctx = data.ctx, imageObj = data.img_src.img, gaps = self.data.split_type === 'gaps' ?  data['mod_space'] : 0,
            print_aspect = (self.data.dims.width + gaps * data['max_rows_cols']['max_cols'])/(self.data.dims.height + gaps * data['max_rows_cols']['max_rows']),
            img_aspect = imageObj.width / imageObj.height,
            new_img_width, new_img_height, img_koeff_resize, offsetX, offsetY;
        //  ctx.clear();
        //image crop
        if(img_aspect >= print_aspect){
            new_img_width = imageObj.height * print_aspect; //crop
            new_img_height = imageObj.height;
            img_koeff_resize = new_img_height / (self.data.dims.height + gaps* data['max_rows_cols']['max_rows']);
            offsetX = (imageObj.width - new_img_width)/2;
            offsetY = 0;
        } else {
            new_img_height = imageObj.width / print_aspect; //crop
            new_img_width = imageObj.width;
            img_koeff_resize = new_img_width / (self.data.dims.width + gaps * data['max_rows_cols']['max_cols']);
            offsetY = (imageObj.height - new_img_height)/2;
            offsetX = 0;
        }
        //
        if(data.img_src.bg){
            // draw back
            var pattern = ctx.createPattern(data.img_src.bg, 'repeat');
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = pattern;
            ctx.fill();
            //
        }
        ctx.font = eval("'"+ data.font_height +"px Arial'");
        ctx.fillStyle = 'black';

        ctx.save();
        drawShadow(obj, data); //draws blurred shadow layer
        ctx.restore();

        drawImage(obj, data); //draws imge layer

        function drawShadow(obj, data){
            var destX, destY, destW, destH;
            ctx.shadowBlur = data.shadow_blur;
            ctx.shadowColor = '#000';
            ctx.shadowOffsetX = data.shadow_offsetX;
            ctx.shadowOffsetY = data.shadow_offsetY;
            ctx.globalAlpha = data.alpha;
            obj.forEach(function(item, i) {
              if(item.visible) {
                    destX = Math.abs(item.abs.x1 - self.data.dims.visible_dims.min_x) * data['canv_koeff_resize'] + data['correct_x'] + data['mod_space']*data['canv_koeff_resize']*item.cols;
                    destY = Math.abs(item.abs.y1 - self.data.dims.visible_dims.min_y) * data['canv_koeff_resize'] + data['correct_y'] + data['mod_space']*data['canv_koeff_resize']*item.rows;
                    destW = item.abs.w * data['canv_koeff_resize'];
                    destH = item.abs.h * data['canv_koeff_resize'];

                    ctx.fillRect(destX, destY, destW, destH);
              }
            });
        }
        function drawImage(obj, data){
            var sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH, txt, margin_txt;
            ctx.globalAlpha = 1;
            ctx.save();
            obj.forEach(function(item, i) {
              if(item.visible) {
                    sourceX = (item.abs.x1 + gaps * item.cols) * img_koeff_resize + offsetX;
                    sourceY = (item.abs.y1 + gaps * item.rows) * img_koeff_resize + offsetY;
                    sourceW = item.abs.w * img_koeff_resize;
                    sourceH = item.abs.h * img_koeff_resize;

                    destX = Math.abs(item.abs.x1 - self.data.dims.visible_dims.min_x) * data['canv_koeff_resize'] + data['correct_x'] + data['mod_space']*data['canv_koeff_resize']*item.cols;
                    destY = Math.abs(item.abs.y1 - self.data.dims.visible_dims.min_y) * data['canv_koeff_resize'] + data['correct_y'] + data['mod_space']*data['canv_koeff_resize']*item.rows;
                    destW = item.abs.w * data['canv_koeff_resize'];
                    destH = item.abs.h * data['canv_koeff_resize'];

                    ctx.drawImage(imageObj, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);

                    if(data['text_draw']) {
                        //contour for segments
                        ctx.beginPath();
                        ctx.strokeStyle = "#292929"; // grey
                        ctx.rect(destX, destY, destW, destH);
                        ctx.stroke();

                        // txt boxes with dims
                        ctx.save();
                        ctx.fillStyle = 'white';
                        ctx.globalAlpha = 0.6;

                        txt = item.id+': '+ Math.round(item.abs.w) + 'x' + Math.round(item.abs.h);

                        margin_txt = 0.06 * item.abs.w * data['canv_koeff_resize'];

                        ctx.fillRect(destX, destY, ctx.measureText(txt).width + margin_txt, data['font_height'] + margin_txt);

                        ctx.restore();
                        ctx.fillStyle = 'black';
                        ctx.fillText(txt, destX + margin_txt / 2, destY + data['font_height'] + margin_txt/2 );
                    }
              }
            });
            ctx.restore();
            if(data['text_draw']){
                //total dims and recommeded gaps
                var font_size_all, font_recomend;
                ctx.beginPath();
                ctx.globalAlpha = 1;
                ctx.save();
                ctx.strokeStyle = "#808080";
                ctx.setLineDash([5, 3]);
                ctx.rect(data['correct_x'], data['correct_y'], ctx.canvas.width - 2 * data['correct_x'], ctx.canvas.height - 2 * data['correct_y']);
                ctx.stroke();
                font_size_all = "'bold " + Math.round(0.025 * ctx.canvas.width) + "px Arial'";
                ctx.font = eval(font_size_all);
                ctx.fillStyle = '#424242';
                ctx.fillText(Math.round(self.data.dims.realWidth) + 'x' + Math.round(self.data.dims.realHeight) + ' см', data['correct_x'], data['correct_y']*0.85);

                // ctx.textAlign = "center";
                // font_recomend = "'bold " + Math.round(0.018 * ctx.canvas.width) + "px Arial'";
                // ctx.font = eval(font_recomend);
                // ctx.fillText(Pic_Settings.text_split_recommends, ctx.canvas.width / 2, ctx.canvas.height - data['correct_y'] * 0.25);

                ctx.restore();
            }
        }
    };
    this.framesChange = function(){
        if(this.init_get_params.init_get_status && self.data.frame === 2) {
            self.containers.frame.eq(1).addClass('clicked');
        }
            if (self.data.bf_flag) {
                self.containers.frame.eq(0).attr("disabled", true).removeAttr('checked');
                self.containers.frame.eq(1).prop("checked", true);
                self.data.frame = 2;
            } else {
                self.containers.frame.eq(0).attr("disabled", false);
                if (!self.containers.frame.eq(1).hasClass('clicked')) {
                    self.containers.frame.eq(0).prop("checked", true);
                    self.data.frame = 1;
                }
            }
        self.data.print_margin = (self.data.frame === 1) ? self.defaults.print_margin_1 : self.defaults.print_margin_2;
    };
    this.outerFrameChange = function(){
        if(self.data.frame == 2){
            this.containers.outer_frame_block.hide();
            self.containers.outer_frame.eq(0).prop("checked", true);
            self.data.outer_frame = false;
        }else{
            this.containers.outer_frame_block.show();
        }
    };
    this.printOnlyToggle = function(){
        if(this.data.product_type === 'print_only'){
            !this.containers.outer_frame_block.is(':hidden') ? this.containers.outer_frame_block.hide() : null;
            !this.containers.frame_block.is(':hidden') ? this.containers.frame_block.hide() : null;
        }else{
            this.containers.frame_block.show();
        }
    };
    this.viewController = function(e){
        if(self.states.effects !== 'loading') { //viewcontroller called after effects completed

            if ( ((this.data.effects_status || this.data.edited_status) && !this.states.mod_edit_open) || !parseInt(this.data.product_id)) {
                self.states.split_open = true;
                self.containers.buttons.show_split.hide();
                self.containers.buttons.edit_open.css('width', '99%');
            }

            if(self.data.special) {
                self.containers.buttons.show_split.css('width', '100%');
            }

            if (!this.data.edited_status && !this.data.effects_status && !this.states.split_open && !self.states.mod_edit_open) {
                self.containers.buttons.show_split.show();
                self.containers.buttons.show_split.removeClass('btn_pushed');
                self.containers.buttons.edit_open.css('width', '49%');
                self.containers.edit_img_block.hide();
                self.containers.buttons.edit_close.hide();
                self.containers.effects_block.hide();
                if (!self.data.special) {
                    self.containers.buttons.edit_open.show();
                }
                if (parseInt(self.data.product_id)){
                    self.containers.main_img_block.show();
                    self.imgsLoad({img: self.containers.main_img_block.find('a[class="dataitem"]').attr('href')}).then(
                        function () {
                            self.spinnerRemove('main_img_block');
                        }
                    )
                }
            }

            if (this.states.mod_edit_open) {
                self.containers.buttons.show_split.hide();
                self.states.split_open = false;
                self.containers.main_img_block.hide();
                self.containers.buttons.edit_open.hide();
                self.containers.edit_img_block.show();
                self.containers.buttons.edit_close.show();
                self.containers.buttons.edit_close.css('width', '99%');
                self.containers.effects_block.show();
                self.editMods(e);
            }

            if (this.states.split_open) {
                self.containers.edit_img_block.hide();
                self.containers.main_img_block.hide();
                self.containers.buttons.edit_close.hide();
                self.containers.effects_block.hide();
                self.containers.canvas.show();
                if(!self.data.special) {
                    self.containers.buttons.edit_open.show();
                }
                self.spinnerAdd('canvas');
                self.canvasMainCreate();
            } else {
                self.containers.canvas.hide();
            }
        }
    };
    this.editBlockStyling = function(){
        if(this.data.aspect >= 1){
            this.containers.edit_img_block.css('height', '');
            this.containers.edit_img_obj.css('width','100%');
            this.containers.edit_img_obj.css('height','');
        }else{
            this.containers.edit_img_block.css('height', '520px');
            this.containers.edit_img_obj.css('height','100%');
            this.containers.edit_img_obj.css('width','');
        }
        this.containers.buttons.edit_open.css('pointer-events','');
    };
    this.manageStage = function(){
        this.containers.cart_block.find('input').attr('disabled', false);
        this.framesChange();
        this.outerFrameChange();
        this.tableTotalInit();
        this.printOnlyToggle();

        if(this.data.special){
            $(document).ready(function() {
                self.disableStage();
            });
        }
        self.defferedLaunch('price_block', self.priceCalc, true);
    };
    this.defferedLaunch = function(name, callback, spinner){
        if(spinner){
            self.spinnerRemove(name);
            self.spinnerAdd(name);
        }
        if(typeof self.states.ms_timer[name] !== undefined && self.states.ms_timer[name]){
            clearTimeout(self.states.ms_timer[name]);
        }
        self.states.ms_timer[name] = setTimeout(callback, 500);
    };
    this.spinnerAdd = function(type){
        var objs = self.containers[type];
        var w = $(objs[0]).outerWidth(), h = $(objs[0]).outerHeight();

        objs.each(function(i, val){
            $(val).prepend('<div class="spinner '+ type +'" style="width:' + w + 'px !important; height:'+ h +'px !important"><div class="loader"></div></div>');
        });
    };
    this.spinnerRemove = function(type){
       $('.spinner.'+ type +'').remove();
    };
    this.editMods = function(e){

        if (self.containers.edit_img_obj.data("mainImageSelectAreas")) {
            self.containers.edit_img_obj.selectAreas('destroy',1);
        }

        self.states.mod_edit_open = true;

        selectAreasInit(self.containers.edit_img_obj);

        function selectAreasInit(imgObj){
            var img_w, img_h, new_img_width, new_img_height, koeff_resize, data = { }, areas, timer, offset_x, offset_y;
            self.imgsLoad({img: self.data.flat_img}).then(function () {
                img_w = imgObj.width();
                img_h = imgObj.height();
                if( (img_w / img_h) >= (self.data.dims.width / self.data.dims.height) ){
                    new_img_width = self.toFixed( img_h * (self.data.dims.width / self.data.dims.height) ); //crop
                    new_img_height = img_h;
                    koeff_resize = self.toFixed( new_img_height /  self.data.dims.height ); // to resize from cm to px
                    offset_y = 0;
                    offset_x = (img_w - new_img_width) / 2;
                } else {
                    new_img_height = self.toFixed( img_w / (self.data.dims.width / self.data.dims.height) ); //crop
                    new_img_width = img_w;
                    koeff_resize =  self.toFixed( new_img_width / self.data.dims.width );
                    offset_y = (img_h - new_img_height) / 2;
                    offset_x = 0;
                }

                data = {
                    img_w: new_img_width,
                    img_h: new_img_height,
                    koeff: koeff_resize,
                    step: self.defaults.edit_min_step * koeff_resize,
                    offsetX: self.toFixed(offset_x),
                    offsetY: self.toFixed(offset_y),
                    limitX: self.toFixed(new_img_width + offset_x),
                    limitY: self.toFixed(new_img_height + offset_y)
                };

                areas = $.map(self.data.segments, function (segment, i) {
                    return (segment.visible) ? {
                        x: self.toFixed(segment.abs.x1 * koeff_resize),
                        y: self.toFixed(segment.abs.y1 * koeff_resize),
                        width: self.toFixed(segment.abs.w * koeff_resize),
                        height: self.toFixed(segment.abs.h * koeff_resize),
                        id: segment.id
                    } : null;
                });

                imgObj.selectAreas({ //send data to plugin in pixel
                    minSize: [self.toFixed(self.defaults.min_size * koeff_resize), self.toFixed(self.defaults.min_size * koeff_resize)],
                    maxSize:[self.toFixed(self.defaults.max_size * koeff_resize), self.toFixed(self.defaults.max_size * koeff_resize)],
                    width: img_w,
                    data: data,
                    areas: areas,
                    onChanging: update_dims_cb,
                    onChanged: update_state_cb,
                    onResized: update_state_res_cb,
                    onCreated: update_state_res_cb,
                    onDeleted: update_state_res_cb,
                    onLoaded: dims_insert_cb
                });
            });
        }
        function segments_create(areas, data){
            var arr = [ ], obj_abs, min_sizes, max_sizes;
            $.each(areas, function (i, item) {
                arr[i] = { };
                arr[i].x1 = self.toFixed( ( (item.x - data.offsetX) / data.koeff) / self.data.dims.width );
                arr[i].y1 = self.toFixed( ( (item.y - data.offsetY) / data.koeff) / self.data.dims.height );
                arr[i].w = self.toFixed( (item.width / data.koeff) / self.data.dims.width );
                arr[i].h = self.toFixed( (item.height / data.koeff) / self.data.dims.height );
                arr[i].visible = true;
            });
            self.data.segments = arr; //renew segments

            self.data.minWidth.rel = self.findMinMaxEl(arr, 'min', 'w');
            self.data.minHeight.rel = self.findMinMaxEl(arr, 'min', 'h');
            self.data.maxWidth.rel = self.findMinMaxEl(arr, 'max', 'w');
            self.data.maxHeight.rel = self.findMinMaxEl(arr, 'max', 'h');

            //changes this.data.min/max Width/Height.abs values
            min_sizes = self.calcMinMaxSizes('min');
            max_sizes = self.calcMinMaxSizes('max');
            self.sliderInit(min_sizes.width, max_sizes.width);

            //creates real size segments and sets dimensions
            obj_abs = self.realSizeSegsCreate(self.data.dims.width, self.data.dims.height, true);
            self.set(obj_abs, 'segments'); //sets segments!
            self.set(self.data.segments, 'total_dims');
        }
        function update_state_cb(event, id, areas, data){
            self.data.edited_status = true;

            segments_create(areas, data);

        }
        function update_state_res_cb(event, id, areas, data){

            if(typeof(timer) !=='undefined' && timer){ clearTimeout(timer);}
            timer = setTimeout(function(){
                self.manageStage();
            }, 500);

        }
        function dims_insert_cb(event, id, areas, data){

            $('.top_arr').css('width', self.round(data.img_w));
            $('.left_arr').css('height', self.round(data.img_h));
            $('.top_arr > span').text(self.round(data.img_w / data.koeff) + ' см');
            $('.left_arr > span').text(self.round(data.img_h / data.koeff) + ' см');

            dims_to_html(event, id, areas, data);

        }
        function update_dims_cb(event, id, areas, data){

            dims_to_html(event, id, areas, data);

        }
        function dims_to_html(event, id, areas, data){
            if(id){
                $.each(areas, function (i, item) {
                    (item.id === id) ? $('#txt_box-' + item.id).html(areaToString(item, data)) : null;
                });
            }else {
                $.each(areas, function (i, item) {
                    $('#txt_box-' + item.id).html(areaToString(item, data));
                });
            }
        }
        function areaToString (area, data) {
            return (typeof area.id === "undefined" ? "" : (area.id + ": ")) + self.round(area.width / data.koeff) +'x'+ self.round(area.height / data.koeff) + '<br />'
        }
    };
    this.events = {
        width: function(){
            var savedVal, w, h, obj;
            self.containers.width.off().focus(function(){
                savedVal = $(this).val();
                $(this).val('');
            }).keyup(function(e){
                if (e.keyCode === 13) {
                    $(this).trigger('blur');
                }
            }).blur(function(){
                if ( $(this).val() === '' || isNaN( parseInt($(this).val()) ) ) {
                    $(this).val(savedVal);
                    return;
                }
                if($(this).val() < self.data.minWidth.abs){
                    w = self.data.minWidth.abs;
                }else if($(this).val() > self.data.maxWidth.abs){
                    w = self.data.maxWidth.abs;
                }else{
                    w = parseInt($(this).val());
                }
                h = w / self.data.aspect;
                obj = self.realSizeSegsCreate(self.round(w), self.round(h));
                self.set(obj, 'segments');
                self.set(self.data.segments, 'total_dims');
                self.defferedLaunch('interiors', self.interiorsCreate, true);
                self.viewController();
                self.manageStage();
            })
        },
        height: function(){
            var savedVal, w, h, obj;
            self.containers.height.off().focus(function(){
                savedVal = $(this).val();
                $(this).val('');
            }).keyup(function(e){
                if (e.keyCode === 13) {
                    $(this).trigger('blur');
                }
            }).blur(function(){
                if ( $(this).val() === '' || isNaN(parseInt( $(this).val() ) ) ) {
                    $(this).val(savedVal);
                    return;
                }
                if($(this).val() < self.data.minHeight.abs){
                    h = self.data.minHeight.abs;
                }else if($(this).val() > self.data.maxHeight.abs){
                    h = self.data.maxHeight.abs;
                }else{
                    h = $(this).val();
                }
                w = h * self.data.aspect;
                obj = self.realSizeSegsCreate(self.round(w), self.round(h));
                self.set(obj, 'segments');
                self.set(self.data.segments, 'total_dims');
                self.defferedLaunch('interiors', self.interiorsCreate, true);
                self.viewController();
                self.manageStage();
            })
        },
        canvas: function(){
            $(window).off('resize.canvResize').on('resize.canvResize', canvasResize);

            function canvasResize(){
                self.canvasMainCreate();
            }
        },
        lak: function(){
            self.containers.lak_type.off().on('change', function(){
                self.data.lak_type = $(this).val();
                self.manageStage();
            });
        },
        outer_frame: function(){
            self.containers.outer_frame.off().on('change', function(){
                self.data.outer_frame = $(this).val();
                self.manageStage();
            });
        },
        material: function(){
            self.containers.material.off().on('change', function(){
                self.data.material = $(this).val();

                if($(this).val() === 'synt'){
                    self.containers.lak_type.eq(0).trigger('click');
                    self.containers.lak_block.hide();
                }else{
                    self.containers.lak_block.show();
                }
                self.manageStage();
            });
        },
        quantity: function(){
            self.containers.quantity.off().keyup(function (e) {
                if (e.keyCode === 13) {
                    $(this).trigger('blur');
                }
            }).blur( function() {
                var quantity = Math.abs(parseInt($(this).val()));
                quantity = (quantity && quantity < 1000) ? quantity : self.defaults.quantity;
                self.data.quantity = quantity;
                self.changeInputs([self.containers.quantity],[quantity]);
                self.manageStage();
            });

            self.containers.buttons.quantity_plus.off().on('click', function(e){
                e.preventDefault();
                self.data.quantity++;
                self.containers.quantity.val(self.data.quantity);
                self.manageStage();
            });
            self.containers.buttons.quantity_minus.off().on('click', function(e){
                e.preventDefault();
                self.data.quantity--;

                self.data.quantity = self.data.quantity < self.defaults.quantity ? self.defaults.quantity : self.data.quantity;

                self.containers.quantity.val(self.data.quantity);

                self.manageStage();
            });
        },
        frame: function(){
            self.containers.frame.off().on('click', function(){
                $(this).addClass('clicked');
            }).on('change', function(){

                self.data.frame = parseInt($(this).val());
                self.data.print_margin = (self.data.frame === 1) ? self.defaults.print_margin_1 : self.defaults.print_margin_2;

                self.manageStage();
            });
        },
        stretch: function () {
            self.containers.stretch.off().on('change', function(){
                self.data.stretch = $(this).val();
                self.manageStage();
            });
        },
        modMainSwitch: function(){
            $(self.containers.buttons.single_main).add(self.containers.buttons.module_main).off().on('click', function(){
                $(self.containers.buttons.single_main, self.containers.buttons.module_main).removeClass('pic_type_active');
                $(this).addClass('pic_type_active');
                $(this).attr('id') === 'single_type' ? self.containers.buttons.single.trigger('click') : $( self.containers.buttons.module.random() ).trigger('click');
                scrollPicMods();
                slidePicMods();
            });
            function scrollPicMods(){
                var bottom = self.containers.mod_parts_block.offset().top - $(window).height() + self.containers.mod_parts_block.height();
                $('html, body').animate({scrollTop: bottom}, 800);
            }
            function slidePicMods(){
                var position = setPositionOwl();
                $('#img-mods').trigger("to.owl.carousel", [position, 200, true]);
            }
        },
        modSwitch: function(){
            self.containers.buttons.mod_parts.off().on('click', function(e){
                if(parseInt(self.data.product_id)){
                    text_change();
                }
                $(self.containers.split_type[0]).trigger('click');
                self.states.split_open = false;
                self.states.mod_edit_open = false;

                self.spinnerAdd('main_img_block');
                self.containers.buttons.mod_parts.removeClass('active');
                $(this).addClass('active');

                self.containers.main_img_block.find('img[itemprop="image"]').attr('src',$(this).data('img'));
                self.containers.main_img_block.find('a[class="dataitem"]').attr('href', $(this).data('img-popup'));

                self.data.mod_type = $(this).data('mod-id');

                $(self.containers.buttons.module_main).add(self.containers.buttons.single_main).removeClass('pic_type_active');
                ( $(this).data('pic_type') === 'single' ) ? self.containers.buttons.single_main.addClass('pic_type_active') : self.containers.buttons.module_main.addClass('pic_type_active');

                self.init(e);
            });
            function text_change(){
                var elements = [
                    $('#tab-description').attr('itemprop', 'description'),
                    $(".product-info h1").first()
                ];
                var regexp = new RegExp(escapeRegExp(Pic_Settings.mod_type_seo_addon),"ig");
                elements.forEach(function (value) {
                    value.html(value.html().replace(regexp,""));
                });
                document.title = document.title.replace(regexp, "");
            }
            function escapeRegExp(text) {
                return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            }
        },
        editOnOff: function(){
            self.containers.buttons.edit_open.off().on('click', function(e){
                e.preventDefault();

                self.states.mod_edit_open = true;

                self.viewController(e);
            });

            self.containers.buttons.edit_close.off().on('click', function(e){
                e.preventDefault();

                self.containers.edit_img_obj.selectAreas('destroy', 1);

                self.states.mod_edit_open = false;

                self.defferedLaunch('interiors', self.interiorsCreate, true);

                self.viewController();
            });

        },
        effects: function(){
            self.containers.buttons.effects.off().on('click', function(){
                var type = $(this).data('effect');
                switch(type){
                    case "flip_v":
                    case "flip_h":
                        self.flip(type);
                        break;
                    case "grayScale":
                    case "sepia":
                    case "contrast":
                    case "mirror":
                        self.addEffect(this, type);
                        break;
                }
            })
        },
        split_type: function(){
            self.containers.split_type.off().on('click', function(){
                var split_slider = self.containers.mod_space.data("ionRangeSlider");
                self.data.split_type = $(this).val();
                if(self.data.split_type === 'no_gaps'){
                    split_slider.update({
                        disable:true
                    });
                    self.data.mod_space = self.defaults.mod_space;
                }else{
                    split_slider.update({
                        disable:false
                    })
                }
                self.data.edited_status = true;
            })
        },
        mod_space: function(){
            self.containers.mod_space.off().on('change', function(){
                self.data.mod_space = parseFloat($(this).val());
            })
        },
        cart: function(){
            self.containers.buttons.cart.off('click.finishEdit').on('click.finishEdit', finish_edit);
            self.containers.buttons.one_click_cart.off('click.finishEditOne').on('click.finishEditOne', finish_edit);
            function finish_edit(){
                self.states.mod_edit_open ? self.containers.buttons.edit_close.trigger('click') : null;
            }
        },
        presets: function(){
            self.containers.buttons.presets.off().on('click', function(){
                self.containers.width.val(parseFloat($(this).data('w')));
                self.containers.width.trigger('blur');
            });
        },
        show_split: function(){
            self.containers.buttons.show_split.off().on('click', function(e){
                e.preventDefault();
                self.containers.buttons.show_split.toggleClass('btn_pushed');
                self.states.split_open = !self.states.split_open;
                self.viewController();
            })
        },
        product_type: function(){
            self.containers.product_type.off().on('change', function(e){
                self.data.product_type = $(this).val();
                self.manageStage();
            })
        }
    };
    this.events_init = function(){
        for(var key in self.events){
            self.events[key]();
        }
    };
    this.disableStage = function(){
        this.containers.buttons.mod_parts.add(this.containers.buttons.preset_sizes).add(this.containers.width)
            .add(this.containers.height).add(this.containers.buttons.module_main).add(this.containers.buttons.single_main).add(this.containers.product_type).off();
        this.containers.mod_parts_block.add(this.containers.preset_sizes).add(this.containers.buttons.module_main).add(this.containers.buttons.single_main).css('opacity','0.5');
        this.containers.cart_block.find('input').attr('disabled','disabled');
        this.containers.slider.data("ionRangeSlider").destroy();
        this.containers.slider_block.hide();
        this.containers.buttons.edit_open.hide();
    };
    this.destroyStage = function(){
        this.containers.buttons.mod_parts.add(this.containers.buttons.preset_sizes).add(this.containers.width)
            .add(this.containers.height).add(this.containers.buttons.module_main).add(this.containers.buttons.single_main).add(this.containers.product_type).off();
        if (this.containers.edit_img_obj.data("mainImageSelectAreas")) {
            this.containers.edit_img_obj.selectAreas('destroy', 1); //silent destroy
        }
        this.containers.edit_img_obj.attr('src', '');
        this.containers.slider.data("ionRangeSlider").destroy();
        this.containers.interiors.off('click');
        this.containers.cart_block.find('input').attr('disabled','disabled');
        $(window).off('resize.canvResize');
        this.containers.canvas[0].getContext('2d').clear();
        $(this.containers.width).add(this.containers.height).val(0);
        for (var prop in this.containers.tableTotal) {
            if( this.containers.tableTotal.hasOwnProperty( prop ) ) {
                $(this.containers.tableTotal[prop]).html('');
            }
        }
    };
    this.tableTotalInit = function(){
        if(this.containers.active_part.data('pic_type') === 'single'){
            this.containers.tableTotal.pic_type.html('Одиночная');
        } else{
            this.containers.tableTotal.pic_type.html('Модульная');
        }

        this.containers.tableTotal.mod_type.html('# '+ self.data.mod_type);

        this.containers.tableTotal.dimensions.html(self.data.dims.realWidth + ' * '+ self.data.dims.realHeight + ' см');
//material
        this.containers.tableTotal.material.html($('label[for="'+this.containers.material_block.find('input:checked').attr('id')+'"]').find('span').text());
//
//frame
        if(this.data.product_type !== 'print_only') {
            this.containers.tableTotal.frame.html($('label[for="' + this.containers.frame_block.find('input:checked').attr('id') + '"]').find('span').text());
            this.containers.tableTotal.frame.removeClass('disabled-popup-link-totals');
        }else{
            this.containers.tableTotal.frame.html('---');
            this.containers.tableTotal.frame.addClass('disabled-popup-link-totals');
        }
//
//outer_frame
        if(this.data.product_type !== 'print_only') {
            this.containers.tableTotal.outer_frame.html($('label[for="' + this.containers.outer_frame_block.find('input:checked').attr('id') + '"]').find('span').text());
            if (this.data.outer_frame === 'false') {
                this.containers.tableTotal.outer_frame.addClass('disabled-popup-link-totals');
            } else {
                this.containers.tableTotal.outer_frame.removeClass('disabled-popup-link-totals');
            }
        }else{
            this.containers.tableTotal.outer_frame.html('---');
            this.containers.tableTotal.outer_frame.addClass('disabled-popup-link-totals');
        }
//
//lak
        this.containers.tableTotal.lak.html($('label[for="'+this.containers.lak_block.find('input:checked').attr('id')+'"]').find('span').text());
        if(this.data.lak_type === 'false'){
            this.containers.tableTotal.lak.addClass('disabled-popup-link-totals');
        }else{
            this.containers.tableTotal.lak.removeClass('disabled-popup-link-totals');
        }

        if(!parseInt(this.data.product_id)){
            var parts = '';
            this.data.segments.forEach(function (item, i) {
                if(item.visible) {
                    parts += '<p><span style="font-weight: 600; color: #757575;">Сегмент № ' + (item.id) + ':</span> ' + self.round(item.abs.w) + ' x ' + self.round(item.abs.h) + ' см.</p>';
                }
            });
            this.containers.tableTotal.segments.html(parts);
        }
    };
    this.priceCalc = function(){
        $.ajax({
            url: 'index.php?route=handlers/calc',
            type: 'post',
            dataType: 'json',
            data:self.data,
            beforeSend: function() {
                $('input:not([disabled])').addClass('ajaxDisabled').prop("disabled", true);
                self.containers.buttons.mod_parts.add($('.number button')).add(self.containers.buttons.presets).css('pointer-events','none');
            },
            success: function(json) {
                self.spinnerRemove('price_block');
                $('.ajaxDisabled').prop('disabled', false).removeClass('ajaxDisabled');
                self.containers.buttons.mod_parts.add($('.number button')).add(self.containers.buttons.presets).css('pointer-events','');
                if (!json['error'] || json['error'].length === 0) {
                    if (json['success']) {
                        $('.alert-success, .alert-danger').remove();

                        self.containers.price.text(json['success']);

                        self.data.price_one = parseInt(json['pure_price_one']);
                        self.data.price_total = parseInt(json['pure_price_total']);

                        if(json['discount_rate']) {
                            $('.wo_discount').remove();
                        if (self.data.special){
                                self.containers.price.before('<span class="wo_discount"><div id="discount_label">-' + json['discount_rate'] + '</div></span>');

                                self.containers.price.text(json['special']);
                                $('.price-old').text(json['success']);

                                if(json['you_save']){
                                    $('.you_save').text(json['you_save']);
                                }

                                if(json['special_quantity_limit']){
                                    self.containers.quantity.val(json['special_quantity_limit']);
                                    self.data.quantity = parseInt(json['special_quantity_limit']);
                                    self.containers.price.after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['special_limit_warning'] + '</div>');
                                }
                            }else{
                                self.containers.price.before('<span class="wo_discount"><div id="discount_label">-' + json['discount_rate'] + '</div>' + json['price_wo_discount'] + '</span>');
                            }
                        }
                        if(json['print_only']){
                            $('.wo_discount').remove();
                        }
                        if(json['self_price']) {
                            if($('.self_price').length){
                                $('.self_price').remove();
                            }
                            var sp_html = '';
                            printValues(json, true);
                            self.containers.price.after(sp_html);

                            function printValues(obj, block) {
                                sp_html += block ? '<div class="self_price">' : '';
                                for (var key in obj) {
                                    if (typeof obj[key] === "object") {
                                        sp_html += '-------- ' + key + ' --------';
                                        printValues(obj[key], false);
                                    } else {
                                        sp_html += '<p>' + key + ': ' + obj[key] + '</p>';
                                    }
                                }
                                sp_html += block ? '</div>' : '';
                            }
                        }else{
                            $('.self_price').remove();
                        }
                    }
                } else{
                    self.containers.price.html('');
                    $('.alert-success, .alert-danger').remove();
                    if(typeof json['error'] === 'object'){
                        for(property in json['error']){
                            self.containers.price.after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'][property] + '</div>');
                        }
                    } else {
                        self.containers.price.after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '</div>');
                    }
                }
            }
        });
    };

    this.init();

};