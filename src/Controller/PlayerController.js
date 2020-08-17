import React from "react";
import {Image} from 'react-native';

export const mapPlayerRank = (mmr) => {

    //TODO: add images for iOS
    if (mmr === 0 || mmr === '') {
        return <Image source={require('../../android/app/src/main/assets/RANK_Unranked.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr <= 1199) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_05.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 1200 && mmr <= 1299) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_04.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 1300 && mmr <= 1399) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_03.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 1400 && mmr <= 1499) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_02.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 1500 && mmr <= 1599) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_01.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 1600 && mmr <= 1699) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_05.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 1700 && mmr <= 1799) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_04.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 1800 && mmr <= 1899) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_03.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 1900 && mmr <= 1999) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_02.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2000 && mmr <= 2099) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_01.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2100 && mmr <= 2199) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_05.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2200 && mmr <= 2299) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_04.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2300 && mmr <= 2399) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_03.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2400 && mmr <= 2499) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_02.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2500 && mmr <= 2599) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_01.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2600 && mmr <= 2699) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500GOLD_04.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2700 && mmr <= 2799) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500GOLD_03.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 2800 && mmr <= 2999) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500GOLD_02.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 3000 && mmr <= 3199) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500GOLD_01.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 3200 && mmr <= 3599) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Platinum_03.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 3600 && mmr <= 3999) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Platinum_02.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 4000 && mmr <= 4399) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Platinum_01.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr >= 4400 && mmr <= 4999) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Diamond_01.png')}
                      style={{width: 30, height: 40}}/>
    }
    if (mmr <= 5000) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Champions_01.png')}
                      style={{width: 30, height: 40}}/>
    }
};
