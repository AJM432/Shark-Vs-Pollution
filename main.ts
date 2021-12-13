namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const Missile = SpriteKind.create()
    export const Final_Boss = SpriteKind.create()
    export const Minion = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Character_Direction = [0, -1]
    Main_Character.setImage(assets.image`Shark Up`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Missile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 500)
    scene.cameraShake(4, 500)
    Shark_Status_Bar_Health.value += -20
    sprite.setPosition(Main_Character.x - Character_Direction[0] * 30, Main_Character.y - Character_Direction[1] * 30)
})
sprites.onDestroyed(SpriteKind.Boss, function (sprite5) {
    Mini_Boss_Kill_Count += 1
    if (Mini_Boss_Kill_Count == 5) {
        Final_Boss2 = sprites.create(assets.image`Final Boss`, SpriteKind.Final_Boss)
        Final_Boss2.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
        Final_Boss2.follow(Main_Character, 5)
        Final_Boss2.setStayInScreen(true)
        Final_Boss2.setBounceOnWall(true)
        Final_Boss_Health_Status_Bar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        Final_Boss_Health_Status_Bar.attachToSprite(Final_Boss2)
        Final_Boss_Health_Status_Bar.value = 100
    }
    Boss_Active = false
    Torpedo = sprites.create(assets.image`Torpedo`, SpriteKind.Missile)
    Torpedo.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
    Torpedo.setVelocity(-50, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Final_Boss, function (sprite, otherSprite) {
    sprite.destroy(effects.trail, 500)
    Minions = sprites.create(img`
        .........................
        .........................
        .........................
        .........................
        ...............9999......
        ............9999cc99.....
        .........999ccccccc99....
        ........99cc2cc2cc99.....
        ........9ccccccccc9......
        ........9cccccccc99......
        ......ff9fccccccc9.......
        .....ff11ffccccf9ffffff..
        .....f11111fccff111111f..
        ....f1111111fff1111111ff.
        ....f1111111ff111111111f.
        ....f11fff11ffffffffff1f.
        ....fff..ffffff......fff.
        ....ff...f.fffff......ff.
        .........f.....ff........
        .........f......f........
        ........c........c.......
        ........c........cc......
        .........................
        .........................
        .........................
        `, SpriteKind.Minion)
    Minions.setPosition(Final_Boss2.x, Final_Boss2.y)
    Minions.follow(Main_Character, 10)
    Final_Boss_Health_Status_Bar.value += -10
    if (Final_Boss_Health_Status_Bar.value <= 0) {
        game.splash("Time:", "" + game.runtime() / 1000 + "(s)")
        game.over(true, effects.confetti)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() >= 10) {
        info.setScore(info.score() - 10)
        Main_Character.startEffect(effects.spray, 500)
        Oil_List = sprites.allOfKind(SpriteKind.Enemy)
        for (let value of Oil_List) {
            value.destroy(effects.ashes, 500)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() - Current_Time >= 500) {
        Oil_Cleaner = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 4 2 4 . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 2 4 4 2 4 . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        Oil_Cleaner.setPosition(Main_Character.x, Main_Character.y)
        Oil_Cleaner.setVelocity(Character_Direction[0] * 70, Character_Direction[1] * 70)
        Current_Time = game.runtime()
        Energy_Timer = game.runtime()
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Minion, function (sprite, otherSprite) {
    sprite.destroy(effects.trail, 500)
    otherSprite.destroy(effects.coolRadial, 500)
    Shark_Status_Bar_Health.value += 10
    info.changeScoreBy(1)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Main_Character.setImage(assets.image`Shark Left`)
    Character_Direction = [-1, 0]
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite6, otherSprite4) {
    otherSprite4.destroy(effects.bubbles, 500)
    Shark_Status_Bar_Health.value += 5
    if (Character_Direction[0] == -1 || Character_Direction[1] == -1) {
        animation.runImageAnimation(
        Main_Character,
        assets.animation`sharkAttackLeft`,
        100,
        false
        )
    } else {
        animation.runImageAnimation(
        Main_Character,
        assets.animation`sharkAttackRight`,
        100,
        false
        )
    }
})
info.onCountdownEnd(function () {
    controller.moveSprite(Main_Character, 23, 23)
})
controller.anyButton.onEvent(ControllerButtonEvent.Repeated, function () {
    if (controller.up.isPressed() || controller.down.isPressed() || (controller.left.isPressed() || controller.right.isPressed())) {
        if (game.runtime() - Energy_Timer >= 10000) {
            info.startCountdown(5)
            Energy_Timer = game.runtime()
            controller.moveSprite(Main_Character, 40, 40)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Final_Boss, function (sprite, otherSprite) {
    game.over(false, effects.melt)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    if (Shark_Status_Bar_Health.value <= 0) {
        game.over(false, effects.splatter)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Character_Direction = [1, 0]
    Main_Character.setImage(assets.image`Shark Right`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Minion, function (sprite, otherSprite) {
    otherSprite.destroy(effects.rings, 500)
    Shark_Status_Bar_Health.value += -5
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite9, otherSprite7) {
    scene.cameraShake(8, 500)
    sprite9.setPosition(Main_Character.x - Character_Direction[0] * 30, Main_Character.y - Character_Direction[1] * 30)
    Shark_Status_Bar_Health.value += -10
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite4, otherSprite3) {
    sprite4.destroy(effects.trail, 500)
    Boss_Status_Bar_Health.value += -34
    otherSprite3.setPosition(Hunter.x - Character_Direction[0] * 30, Hunter.y - Character_Direction[1] * 30)
    Hunter.startEffect(effects.spray, 500)
    if (Boss_Status_Bar_Health.value <= 0) {
        otherSprite3.destroy(effects.blizzard, 500)
        info.changeScoreBy(3)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    Character_Direction = [0, 1]
    Main_Character.setImage(assets.image`Shark Down`)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite7, otherSprite5) {
    sprite7.destroy(effects.trail, 500)
    otherSprite5.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
})
sprites.onCreated(SpriteKind.Boss, function (sprite2) {
    Boss_Active = true
    Boss_Status_Bar_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Boss_Status_Bar_Health.setColor(10, 2)
    Boss_Status_Bar_Health.attachToSprite(sprite2)
    Boss_Status_Bar_Health.value = 100
    Boss_Status_Bar_Health.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite8, otherSprite6) {
    scene.cameraShake(4, 500)
    otherSprite6.destroy(effects.fire, 100)
    Shark_Status_Bar_Health.value += -5
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Missile, function (sprite3, otherSprite2) {
    otherSprite2.destroy(effects.warmRadial, 500)
    info.changeScoreBy(3)
})
let Oil: Sprite = null
let Fish: Sprite = null
let Random_Number = 0
let Hunter: Sprite = null
let Boss_Status_Bar_Health: StatusBarSprite = null
let Energy_Timer = 0
let Oil_Cleaner: Sprite = null
let Oil_List: Sprite[] = []
let Minions: Sprite = null
let Final_Boss_Health_Status_Bar: StatusBarSprite = null
let Final_Boss2: Sprite = null
let Mini_Boss_Kill_Count = 0
let Shark_Status_Bar_Health: StatusBarSprite = null
let Torpedo: Sprite = null
let Boss_Active = false
let Current_Time = 0
let Character_Direction: number[] = []
let Main_Character: Sprite = null
scene.setBackgroundImage(assets.image`Ocean BG`)
Main_Character = sprites.create(assets.image`Shark Normal`, SpriteKind.Player)
Main_Character.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
controller.moveSprite(Main_Character, 23, 23)
Main_Character.setStayInScreen(true)
let Playing = 1
Character_Direction = [-50, 0]
Current_Time = 0
info.setScore(0)
Boss_Active = false
Torpedo = sprites.create(assets.image`Torpedo`, SpriteKind.Missile)
Torpedo.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
Torpedo.setVelocity(-50, 0)
Shark_Status_Bar_Health = statusbars.create(20, 4, StatusBarKind.Health)
Shark_Status_Bar_Health.attachToSprite(Main_Character)
Shark_Status_Bar_Health.value = 100
Shark_Status_Bar_Health.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
Mini_Boss_Kill_Count = 0
game.showLongText("PLAY", DialogLayout.Bottom)
game.onUpdateInterval(2000, function () {
    if (Playing == 1) {
        Random_Number = randint(0, 10)
        if (Random_Number < 5) {
            Fish = sprites.create(img`
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                ...........ffff.....fff..
                ........fff4777f...ffaf..
                ......ff4444477ff.ffaaf..
                .....f5544444477fff555f..
                ....f5f5544444477faaaaf..
                ....f555544ccc477faaaaf..
                .....f554444c477fff555f..
                ......ff4444477ff.ffaaf..
                ........fff4777f...ffaf..
                ...........ffff.....fff..
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                `, SpriteKind.Food)
            Fish.setStayInScreen(true)
            Fish.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
        } else if (Random_Number < 9) {
            Oil = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f f . . . . . . 
                . . . . f f f 7 f f f . . . . . 
                . . . . f f 7 7 7 f f . . . . . 
                . . . . f 7 7 8 7 7 f . . . . . 
                . . . . f f 7 7 7 f f . . . . . 
                . . . . f f f 7 f f f . . . . . 
                . . . . . f f f f f . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Enemy)
            Oil.setStayInScreen(true)
            Oil.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
        } else if (!(Boss_Active)) {
            Hunter = sprites.create(img`
                ......ffff..............
                ....fff22fff............
                ...fff2222fff...........
                ..fffeeeeeefff..........
                ..ffe222222eef..........
                ..fe2ffffff2ef..........
                ..ffffeeeeffff......ccc.
                .ffefbf44fbfeff....cddc.
                .ffefbf44fbfeff...cddc..
                .fee4dddddd4eef.ccddc...
                fdfeeddddd4eeffecddc....
                fbffee4444ee4fddccc.....
                fbf4f222222f1edde.......
                fcf.f222222f44ee........
                .ff.f445544f............
                ....ffffffff............
                .....ff..ff.............
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                `, SpriteKind.Boss)
            Hunter.setBounceOnWall(true)
            Hunter.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
            Hunter.follow(Main_Character, 5)
            Hunter.setStayInScreen(true)
        }
    }
})
forever(function () {
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(370, music.beat(BeatFraction.Whole))
    music.playTone(247, music.beat(BeatFraction.Whole))
    music.playTone(247, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(247, music.beat(BeatFraction.Whole))
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(196, music.beat(BeatFraction.Whole))
    music.playTone(220, music.beat(BeatFraction.Whole))
    music.playTone(220, music.beat(BeatFraction.Whole))
    music.playTone(247, music.beat(BeatFraction.Whole))
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(370, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(494, music.beat(BeatFraction.Whole))
    music.playTone(440, music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Whole))
    music.playTone(440, music.beat(BeatFraction.Whole))
    music.playTone(370, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Whole))
    music.playTone(370, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(494, music.beat(BeatFraction.Whole))
    music.playTone(440, music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Whole))
    music.playTone(370, music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Whole))
    music.playTone(440, music.beat(BeatFraction.Whole))
    music.playTone(370, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Whole))
    music.playTone(370, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(370, music.beat(BeatFraction.Whole))
    music.playTone(247, music.beat(BeatFraction.Whole))
})
