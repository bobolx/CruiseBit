
enum MotorDirection {
    //% block="左侧"
    left,
    //% block="右侧"
    right
}

enum ToneHzTable {
    do = 262,
    re = 294,
    mi = 330,
    fa = 349,
    sol = 392,
    la = 440,
    si = 494
}

enum BeatList {
    //% block="1"
    whole_beat = 10,
    //% block="1/2"
    half_beat = 11,
    //% block="1/4"
    quarter_beat = 12,
    //% block="1/8"
    eighth_beat = 13,
    //% block="2"
    double_beat = 14,
    //% block="4"
    breve_beat = 15
}

enum SongList {
    //% block="生日歌"
    birthday = 1,
    //% block="婚礼进行曲"
    wedding = 2
}

enum Patrol{
    //% block="□□"
    white_white = 1,
    //% block="□■"
    white_black = 2,
    //% block="■□"
    black_white = 3,
    //% block="■■"
    black_black = 4
}

enum PingUnit {
    //% block="cm"
    Centimeters,
    //% block="μs"
    MicroSeconds
}

enum RgbList {
    //% block="灯1"
    rgb1 = 0,
    //% block="灯2"
    rgb2 = 1,
    //% block="灯3"
    rgb3 = 2,
    //% block="灯4"
    rgb4 = 3,
    //% block="灯5"
    rgb5 = 4,
    //% block="灯6"
    rgb6 = 5,
    //% block="灯7"
    rgb7 = 6,
    //% block="灯8"
    rgb8 = 7,
    //% block="灯9"
    rgb9 = 8,
}

enum ColorList {
    //% block="红"
    red = 1,
    //% block="橙"
    orange = 2,
    //% block="黄"
    yellow = 3,
    //% block="绿"
    green = 4,
    //% block="蓝"
    blue = 5,
    //% block="靛"
    indigo = 6,
    //% block="浅紫"
    violet = 7,
    //% block="深紫"
    purple = 8,
    //% block="白"
    white = 9,
    //% block="黑"
    black = 10
}

enum IRList {
    //% block="前方"
    front = 1,
    //% block="左侧"
    right = 2,
    //% block="右侧"
    left = 3,
}

//% weight=99 icon="\uf0e7" color=#1B80C4
namespace CruiseBit {


    /**
     * 设置电机
     */
    //% blockId="cruise_motor" block="电机 左 速度%leftSpeed| 右 速度%rightSpeed"
    //% leftSpeed.min=-1023 leftSpeed.max=1023
    //% rightSpeed.min=-1023 rightSpeed.max=1023
    //% weight=100
    export function motorRun(leftSpeed: number, rightSpeed: number): void {
        let leftRotation = 0;
        if(leftSpeed < 0){
            leftRotation = 1;
        }

        let rightRotation = 0;
        if(rightSpeed < 0){
            rightRotation = 1;
        }
        
       //左电机 M1
        pins.analogWritePin(AnalogPin.P14, Math.abs(leftSpeed));
        pins.digitalWritePin(DigitalPin.P13, leftRotation);
        
        //右电机 M2
        pins.analogWritePin(AnalogPin.P16, Math.abs(rightSpeed));
        pins.digitalWritePin(DigitalPin.P15, rightRotation);
        
    }

    /**
     * 停止单个电机
     */
    //% blockId="cruise_stop" block="电机 停止 %direction"
    //% weight=98
    export function motorStop(direction: MotorDirection): void {
        if(direction == MotorDirection.left){
            pins.analogWritePin(AnalogPin.P14, 0);
            pins.digitalWritePin(DigitalPin.P13, 0);
        }
        if(direction == MotorDirection.right){
            pins.analogWritePin(AnalogPin.P16, 0);
            pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }


    /**
     * 停止所有电机
     */
    //% weight=97
    //% blockId="cruise_stopAll" block="停止所有电机"
    export function motorStopAll(): void {
        //左电机 M1
        pins.analogWritePin(AnalogPin.P14, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        //右电机 M2
        pins.analogWritePin(AnalogPin.P16, 0);
        pins.digitalWritePin(DigitalPin.P15, 0);
    }

    /**
     * 播放音调
     */
    //% weight=89
    //% blockId="cruise_tone" block="播放音调 %tone| ，节拍 %beatInfo"
    export function myPlayTone(tone:ToneHzTable, beatInfo:BeatList): void {

        if(beatInfo == BeatList.whole_beat){
            music.playTone(tone, music.beat(BeatFraction.Whole));

        }
       
        if(beatInfo == BeatList.half_beat){
            music.playTone(tone, music.beat(BeatFraction.Half));

        }
        
        if(beatInfo == BeatList.quarter_beat){
            music.playTone(tone, music.beat(BeatFraction.Quarter));

        }

        if(beatInfo == BeatList.double_beat){
            music.playTone(tone, music.beat(BeatFraction.Double));

        }

        
        if(beatInfo == BeatList.eighth_beat){
            music.playTone(tone, music.beat(BeatFraction.Eighth));

        }

        if(beatInfo == BeatList.breve_beat){
            music.playTone(tone, music.beat(BeatFraction.Breve));

        }
        //1、16不行
        // if(beatInfo == BeatList.sixteen_beat){
        //     music.playTone(tone, music.beat(BeatFraction.SixTeenth));

        // }    
    }

    /**
     * 播放音乐
     */
    // //% weight=88
    // //% blockId="cruise_music" block="播放音乐 %song"
    // export function MyPlayMusic(song: SongList): void {
    //     if(song == SongList.wedding){
    //         music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once);
    //     }else{
    //         music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once);
    //     }
        
    // }

    //% weight=79
    //% blockId="cruise_patrol" block="巡线传感器 %patrol"
    export function readPatrol(patrol:Patrol): boolean {

        // let p1 = pins.digitalReadPin(DigitalPin.P12);
        // let p2 = pins.digitalReadPin(DigitalPin.P11);

        if(patrol == Patrol.white_white){
            if(pins.digitalReadPin(DigitalPin.P12) == 0 && pins.digitalReadPin(DigitalPin.P11) == 0){
                return true;
            }else{
                return false;
            }
        }else if(patrol == Patrol.white_black){
            if(pins.digitalReadPin(DigitalPin.P12) == 1 && pins.digitalReadPin(DigitalPin.P11) == 0){
                return true;
            }else{
                return false;
            }
        }else if(patrol == Patrol.black_white){
            if(pins.digitalReadPin(DigitalPin.P12) == 0 && pins.digitalReadPin(DigitalPin.P11) == 1){
                return true;
            }else{
                return false;
            }
        }else if(patrol == Patrol.black_black){
            if(pins.digitalReadPin(DigitalPin.P12) == 1 && pins.digitalReadPin(DigitalPin.P11) == 1){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }

    //% blockId=cruise_sensor block="超声波距离 %unit"
    //% weight=69
    export function sensorDistance(unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(DigitalPin.P5, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P5, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P5, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P5, 0);
        
        // read pulse
        let d = pins.pulseIn(DigitalPin.P2, PulseValue.High, maxCmDistance * 42);
        //console.log("Distance: " + d/42);
        
        basic.pause(50)

        switch (unit) {
            case PingUnit.Centimeters: return d / 42;
            default: return d ;
        }
    }

    /**
      * 红外线探测左、前、右是否有障碍物
      */
    //% blockId="cruise_IR" block="红外线探测 %IRDire 有障碍物"
    //% weight=68
    export function cruiseIR(IRDire:IRList): boolean {
        if(IRDire == IRList.front){
            if(pins.digitalReadPin(DigitalPin.P5) == 0){
                return true;
            }else{
                return false;
            }
        }
        
        if(IRDire == IRList.left){
            if(pins.digitalReadPin(DigitalPin.P2) == 0){
                return true;
            }else{
                return false;
            }
        }

        if(IRDire == IRList.right){
            if(pins.digitalReadPin(DigitalPin.P8) == 0){
                return true;
            }else{
                return false;
            }
        }
    }


    
}


