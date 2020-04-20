
var table = require('../utils/table');
var utils = require('../utils/utils');
var gameconst = require('./gameconst');
var Hero_Act_State = gameconst.Hero_Act_State;

exports.moveToNextHero = function (seats) {
    var res = exports.initActHeroOrder(seats);
    // 首个为当前可行动英雄
    if(!table.isEmpty(res))
        res[0].act_state = Hero_Act_State.Acting;
}
// 
exports.initActHeroOrder = function (seats,moveToNext) {
    if (table.isEmpty(seats)) {
        return;
    }
    var res = [];
    for( var i = 0; i < seats.length; i++) {
        if(!table.isEmpty(seats[i].heros)){
            for( var j = 0; j < seats[i].heros.length; j++) {
                var t_hero = seats[i].heros[j];
                if(t_hero.curhp > 0){
                    res.push(t_hero);
                }
                else{
                    t_hero.act_state = Hero_Act_State.UnableAct;
                }
            }
        }
    }

    // 确定初始化
    for( var i = 0; i < res.length; i++) {
        res[i].act_state = utils.isNull(res[i].act_state) ? Hero_Act_State.CanAct : res[i].act_state;
    }

    // 找出当前可行动英雄
    var cur_act_hero = table.find(res,function(cur){
        return cur.act_state === Hero_Act_State.Acting;
    });

    // 取消当前行动英雄
    if(cur_act_hero && moveToNext){
        cur_act_hero.value.act_state = Hero_Act_State.Acted;
    }

    // 找出所有可行动英雄
    var can_act_hero = table.findAll(res,function(cur){
        return cur.act_state === Hero_Act_State.CanAct;
    });

    // 如果没有重新初始化
    if (table.isEmpty(can_act_hero)){
        for( var i = 0; i < res.length; i++) {
            if(res[i].act_state !== Hero_Act_State.UnableAct)
                res[i].act_state = Hero_Act_State.CanAct;
        }
    }
    // 按速度排序
    res.sort(function(f,s){
        if(f.act_state === s.act_state){
            return s.spd - f.spd;
        }else{
            return f.act_state < s.act_state ? -1 : 1;
        }
    })

    return res;
}

exports.getNowActHero = function (seats) {
    if (table.isEmpty(seats)) {
        return;
    }
    for( var i = 0; i < seats.length; i++) {
        if(!table.isEmpty(seats[i].heros)){
            for( var j = 0; j < seats[i].heros.length; j++) {
                var t_hero = seats[i].heros[j];
                if(t_hero.curhp > 0 && t_hero.act_state.act_state === Hero_Act_State.Acting){
                    return t_hero;
                }
            }
        }
    }
}

exports.getAliveHeros = function (seats,targetIds) {
    if (table.isEmpty(seats)) {
        return;
    }
    var res = [];
    for( var i = 0; i < seats.length; i++) {
        if(!table.isEmpty(seats[i].heros)){
            for( var j = 0; j < seats[i].heros.length; j++) {
                var t_hero = seats[i].heros[j];
                if(t_hero.curhp > 0 && (table.isEmpty(targetIds) || table.fincontainsd(targetIds,function(cur){
                    return cur === t_hero.id;
                }))){
                    res.push(t_hero);
                }
            }
        }
    }
    return res;
}