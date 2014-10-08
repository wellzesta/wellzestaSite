
(function ($) { "use strict";

    // CONFIRMATION PUBLIC CLASS DEFINITION
    // ===============================

    var Confirmation = function (element, options) {
        this.init('confirmation', element, options)
    }

    if (!$.fn.popover) throw new Error('Confirmation requires popover.js')

    Confirmation.DEFAULTS = $.extend({} , $.fn.popover.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '<div class="btn-group">'+
                '<button type="button" class="btn btn-sm btn-success pull-left" href="" target="">Yes</button>' +
                '<button type="button" class="btn btn-sm btn-danger pull-left" data-dismiss="confirmation">No</button>' +
                '</div>',
        title: 'Are you sure?',
        container: 'body',
        onConfirm: function() {},
        onCancel: function() {}
    })


    // NOTE: CONFIRMATION EXTENDS tooltip.js
    // ================================

    Confirmation.prototype = $.extend({}, $.fn.popover.Constructor.prototype)

    Confirmation.prototype.constructor = Confirmation

    Confirmation.prototype.getDefaults = function () {
        return Confirmation.DEFAULTS
    }

    Confirmation.prototype.setContent = function () {
        var $tip    = this.tip(),
            that = this,
            title   = this.getTitle(),
            content = this.getContent(),
            btnConfirm,
            btnCancel;

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content').html(content)
        $tip.find('.popover-content').addClass('text-center');

        btnConfirm = $tip.find('.popover-content > div > button:not([data-dismiss="confirmation"])'),
        btnCancel = $tip.find('.popover-content > div > button[data-dismiss="confirmation"]');

        btnConfirm.click(function() {
            if (that.options.onConfirm() !== false) {
                that.$element.confirmation('hide');
                that.$tip.hide();
            }
        });

        btnCancel.click(function() {
            if (that.options.onCancel() !== false) {
                that.$element.confirmation('hide');
                that.$tip.hide();
            }
        });

        $tip.removeClass('fade top bottom left right in')

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
    }

    // CONFIRMATION PLUGIN DEFINITION
    // =========================

    var old = $.fn.confirmation

    $.fn.confirmation = function (option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.confirmation')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.confirmation', (data = new Confirmation(this, options)))
                if (typeof option == 'string') data[option]()
            })
    }

    $.fn.confirmation.Constructor = Confirmation

    // CONFIRMATION NO CONFLICT
    // ===================

    $.fn.confirmation.noConflict = function () {
        $.fn.confirmation = old
        return this
    }

}(window.jQuery));