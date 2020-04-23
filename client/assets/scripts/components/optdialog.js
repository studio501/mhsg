import { EventTool } from "../base/event/event_tool";
cc.Class({
    extends: cc.Component,
    onLoad() {
        let bgs = ["bg1", "bg0", "bg00"];
        this.bg_arr = [];
        for (var i = 0; i < bgs.length; i++) {
            this.bg_arr.push(this.node.getChildByName(bgs[i]));
        }

        this.label_arr = [];
        for (var i = 0; i < 6; i++) {
            this.label_arr.push(this.node.getChildByName(`lb${i + 1}`).getComponent('cc.Label'));
        }

        cc.vv.utils.addClickEvent(this.node.getChildByName("backBtn"), this.node, "optdialog", "onBackClick");
    },

    setData(label_contens) {
        this.node.active = true;
        for (var i = 0; i < label_contens.length; i++) {
            if (this.label_arr[i] && label_contens[i])
                this.label_arr[i].string = label_contens[i];
        }
    },

    onBackClick(event) {
        event_mgr.get_inst().fire(Event_Name.optdialog_back);
    }
});
