@namespace
class SpriteKind:
    Boss = SpriteKind.create()
    Missile = SpriteKind.create()

def on_up_pressed():
    global Character_Direction
    Character_Direction = [0, -1]
    Main_Character.set_image(assets.image("""
        Shark Up
    """))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy(effects.warm_radial, 500)
    scene.camera_shake(4, 500)
    Shark_Status_Bar_Health.value += -20
    sprite.set_position(Main_Character.x - Character_Direction[0] * 30,
        Main_Character.y - Character_Direction[1] * 30)
sprites.on_overlap(SpriteKind.player, SpriteKind.Missile, on_on_overlap)

def on_b_pressed():
    global Oil_List
    if info.score() >= 1:
        info.set_score(info.score() - 1)
        Main_Character.start_effect(effects.spray, 500)
        Oil_List = sprites.all_of_kind(SpriteKind.enemy)
        for value in Oil_List:
            value.destroy(effects.ashes, 500)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_up_repeated():
    global Energy_Timer
    if game.runtime() - Energy_Timer >= 5000:
        info.start_countdown(3)
        Energy_Timer = game.runtime()
        controller.move_sprite(Main_Character, 40, 40)
controller.up.on_event(ControllerButtonEvent.REPEATED, on_up_repeated)

def on_on_created(sprite2):
    global Boss_Active, Boss_Status_Bar_Health
    Boss_Active = True
    Boss_Status_Bar_Health = statusbars.create(20, 4, StatusBarKind.enemy_health)
    Boss_Status_Bar_Health.set_color(10, 2)
    Boss_Status_Bar_Health.attach_to_sprite(sprite2)
    Boss_Status_Bar_Health.value = 100
sprites.on_created(SpriteKind.Boss, on_on_created)

def on_on_overlap2(sprite3, otherSprite2):
    otherSprite2.destroy(effects.warm_radial, 500)
    info.change_score_by(3)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Missile, on_on_overlap2)

def on_a_pressed():
    global Oil_Cleaner, Current_Time, Energy_Timer
    if game.runtime() - Current_Time >= 500:
        Oil_Cleaner = sprites.create(img("""
                . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 1 1 1 1 1 1 1 . . . . . . 
                            . . . 1 1 9 9 9 1 1 . . . . . . 
                            . . . . 1 b b b 1 . . . . . . . 
                            . . . . 1 1 d 1 1 . . . . . . . 
                            . . . . . 1 1 1 . . . . . . . . 
                            . . . . . . 1 . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . .
            """),
            SpriteKind.projectile)
        Oil_Cleaner.set_position(Main_Character.x, Main_Character.y)
        Oil_Cleaner.set_velocity(Character_Direction[0] * 70, Character_Direction[1] * 70)
        Current_Time = game.runtime()
        Energy_Timer = game.runtime()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap3(sprite4, otherSprite3):
    sprite4.destroy(effects.trail, 500)
    Boss_Status_Bar_Health.value += -34
    otherSprite3.set_position(Hunter.x - Character_Direction[0] * 30,
        Hunter.y - Character_Direction[1] * 30)
    Hunter.start_effect(effects.spray, 500)
    if Boss_Status_Bar_Health.value <= 0:
        otherSprite3.destroy(effects.blizzard, 500)
        info.change_score_by(3)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Boss, on_on_overlap3)

def on_on_destroyed(sprite5):
    global Boss_Active, Torpedo
    Boss_Active = False
    Torpedo = sprites.create(assets.image("""
        Torpedo
    """), SpriteKind.Missile)
    Torpedo.set_position(scene.screen_width(), randint(0, scene.screen_height()))
    Torpedo.set_velocity(-50, 0)
sprites.on_destroyed(SpriteKind.Boss, on_on_destroyed)

def on_right_repeated():
    global Energy_Timer
    if game.runtime() - Energy_Timer >= 5000:
        info.start_countdown(3)
        Energy_Timer = game.runtime()
        controller.move_sprite(Main_Character, 40, 40)
controller.right.on_event(ControllerButtonEvent.REPEATED, on_right_repeated)

def on_left_pressed():
    global Character_Direction
    Main_Character.set_image(assets.image("""
        Shark Left
    """))
    Character_Direction = [-1, 0]
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_countdown_end():
    controller.move_sprite(Main_Character, 23, 23)
info.on_countdown_end(on_countdown_end)

def on_on_zero(status):
    if Shark_Status_Bar_Health.value <= 0:
        game.over(False, effects.splatter)
statusbars.on_zero(StatusBarKind.health, on_on_zero)

def on_right_pressed():
    global Character_Direction
    Character_Direction = [1, 0]
    Main_Character.set_image(assets.image("""
        Shark Right
    """))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_repeated():
    global Energy_Timer
    if game.runtime() - Energy_Timer >= 5000:
        info.start_countdown(3)
        Energy_Timer = game.runtime()
        controller.move_sprite(Main_Character, 40, 40)
controller.down.on_event(ControllerButtonEvent.REPEATED, on_down_repeated)

def on_down_pressed():
    global Character_Direction
    Character_Direction = [0, 1]
    Main_Character.set_image(assets.image("""
        Shark Down
    """))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_on_overlap4(sprite6, otherSprite4):
    otherSprite4.destroy(effects.bubbles, 100)
    Shark_Status_Bar_Health.value += 5
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap4)

def on_on_overlap5(sprite7, otherSprite5):
    sprite7.destroy(effects.trail, 500)
    otherSprite5.destroy(effects.disintegrate, 500)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap5)

def on_on_overlap6(sprite8, otherSprite6):
    scene.camera_shake(4, 500)
    otherSprite6.destroy(effects.fire, 100)
    Shark_Status_Bar_Health.value += -5
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap6)

def on_left_repeated():
    global Energy_Timer
    if game.runtime() - Energy_Timer >= 5000:
        info.start_countdown(3)
        Energy_Timer = game.runtime()
        controller.move_sprite(Main_Character, 40, 40)
controller.left.on_event(ControllerButtonEvent.REPEATED, on_left_repeated)

def on_on_overlap7(sprite9, otherSprite7):
    scene.camera_shake(8, 500)
    sprite9.set_position(Main_Character.x - Character_Direction[0] * 30,
        Main_Character.y - Character_Direction[1] * 30)
    Shark_Status_Bar_Health.value += -10
sprites.on_overlap(SpriteKind.player, SpriteKind.Boss, on_on_overlap7)

Oil: Sprite = None
Fish: Sprite = None
Random_Number = 0
Hunter: Sprite = None
Oil_Cleaner: Sprite = None
Boss_Status_Bar_Health: StatusBarSprite = None
Energy_Timer = 0
Oil_List: List[Sprite] = []
Shark_Status_Bar_Health: StatusBarSprite = None
Torpedo: Sprite = None
Boss_Active = False
Current_Time = 0
Character_Direction: List[number] = []
Main_Character: Sprite = None
scene.set_background_image(assets.image("""
    Ocean BG
"""))
Main_Character = sprites.create(assets.image("""
    Shark Normal
"""), SpriteKind.player)
Main_Character.set_position(scene.screen_width() / 2, scene.screen_height() / 2)
controller.move_sprite(Main_Character, 23, 23)
Main_Character.set_stay_in_screen(True)
Playing = 1
Character_Direction = [-50, 0]
Current_Time = 0
info.set_score(0)
Boss_Active = False
Torpedo = sprites.create(assets.image("""
    Torpedo
"""), SpriteKind.Missile)
Torpedo.set_position(scene.screen_width(), randint(0, scene.screen_height()))
Torpedo.set_velocity(-50, 0)
Shark_Status_Bar_Health = statusbars.create(20, 4, StatusBarKind.health)
Shark_Status_Bar_Health.attach_to_sprite(Main_Character)
Shark_Status_Bar_Health.value = 100

def on_update_interval():
    global Random_Number, Fish, Oil, Hunter
    if Playing == 1:
        Random_Number = randint(0, 10)
        if Random_Number < 5:
            Fish = sprites.create(img("""
                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . c c c c . . . . 
                                    . . . . . . c c d d d d c . . . 
                                    . . . . . c c c c c c d c . . . 
                                    . . . . c c 4 4 4 4 d c c . . . 
                                    . . . c 4 d 4 4 4 4 4 1 c . c c 
                                    . . c 4 4 4 1 4 4 4 4 d 1 c 4 c 
                                    . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c 
                                    f 4 4 4 4 4 1 4 4 4 4 4 1 4 4 f 
                                    f 4 4 4 f 4 1 c c 4 4 4 1 f 4 f 
                                    f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f 
                                    . f 4 4 4 4 1 c 4 f 4 d f f f f 
                                    . . f f 4 d 4 4 f f 4 c f c . . 
                                    . . . . f f 4 4 4 4 c d b c . . 
                                    . . . . . . f f f f d d d c . . 
                                    . . . . . . . . . . c c c . . .
                """),
                SpriteKind.food)
            Fish.set_stay_in_screen(True)
            Fish.set_position(randint(0, scene.screen_width()),
                randint(0, scene.screen_height()))
        elif Random_Number < 9:
            Oil = sprites.create(img("""
                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . f f f f . . . . . . . 
                                    . . . . . f f f f f . . . . . . 
                                    . . . . . f f f f f . . . . . . 
                                    . . . . . f f 7 f f f . . . . . 
                                    . . . . f f f f f f f . . . . . 
                                    . . . . . f f f . . . . . . . . 
                                    . . . . . . f . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . .
                """),
                SpriteKind.enemy)
            Oil.set_stay_in_screen(True)
            Oil.set_position(randint(0, scene.screen_width()),
                randint(0, scene.screen_height()))
        else:
            if not (Boss_Active):
                Hunter = sprites.create(img("""
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
                    """),
                    SpriteKind.Boss)
                Hunter.set_bounce_on_wall(True)
                Hunter.set_position(randint(0, scene.screen_width()),
                    randint(0, scene.screen_height()))
                Hunter.follow(Main_Character, 5)
                Hunter.set_stay_in_screen(True)
game.on_update_interval(2000, on_update_interval)

def on_forever():
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(392, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(330, music.beat(BeatFraction.WHOLE))
    music.play_tone(370, music.beat(BeatFraction.WHOLE))
    music.play_tone(247, music.beat(BeatFraction.WHOLE))
    music.play_tone(247, music.beat(BeatFraction.WHOLE))
    music.play_tone(330, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    music.play_tone(247, music.beat(BeatFraction.WHOLE))
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(196, music.beat(BeatFraction.WHOLE))
    music.play_tone(220, music.beat(BeatFraction.WHOLE))
    music.play_tone(220, music.beat(BeatFraction.WHOLE))
    music.play_tone(247, music.beat(BeatFraction.WHOLE))
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(330, music.beat(BeatFraction.WHOLE))
    music.play_tone(370, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(494, music.beat(BeatFraction.WHOLE))
    music.play_tone(440, music.beat(BeatFraction.WHOLE))
    music.play_tone(392, music.beat(BeatFraction.WHOLE))
    music.play_tone(440, music.beat(BeatFraction.WHOLE))
    music.play_tone(370, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(392, music.beat(BeatFraction.WHOLE))
    music.play_tone(370, music.beat(BeatFraction.WHOLE))
    music.play_tone(330, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(494, music.beat(BeatFraction.WHOLE))
    music.play_tone(440, music.beat(BeatFraction.WHOLE))
    music.play_tone(392, music.beat(BeatFraction.WHOLE))
    music.play_tone(370, music.beat(BeatFraction.WHOLE))
    music.play_tone(392, music.beat(BeatFraction.WHOLE))
    music.play_tone(440, music.beat(BeatFraction.WHOLE))
    music.play_tone(370, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(392, music.beat(BeatFraction.WHOLE))
    music.play_tone(370, music.beat(BeatFraction.WHOLE))
    music.play_tone(330, music.beat(BeatFraction.WHOLE))
    music.play_tone(294, music.beat(BeatFraction.WHOLE))
    music.play_tone(330, music.beat(BeatFraction.WHOLE))
    music.play_tone(370, music.beat(BeatFraction.WHOLE))
    music.play_tone(247, music.beat(BeatFraction.WHOLE))
forever(on_forever)
