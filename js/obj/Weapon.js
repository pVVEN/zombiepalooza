var Weapon = function (game, player, key)
{
    //console.log('Weapon constructor');
    Phaser.Group.call(this, game, game.world, key, false, true, Phaser.Physics.ARCADE);

    this.name = 'Default';
    this.player = player;

    this.SPREAD_ANGLE_WIDTH = 8 * 0.6;//0.0174532925;
    //this.nextFire = 0;
    this.fireRate = 100;
    this.fireModifier = 1;//0;
    this.numBullets = 1;

    this.isShooting = false;

    this.shootTimer = game.time.create(false);
    //this.shootTimer.loop(this.fireRate * this.fireModifier, this.stopShooting, this);

    return this;
};

Weapon.prototype = Object.create(Phaser.Group.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.startShooting = function()
{
    console.log("startShooting");
    if(!this.shootTimer.running)//this.isShooting)
    {
        this.shootTimer.loop(this.fireRate * this.fireModifier, this.stopShooting, this);
        this.shootTimer.start();
        //this.isShooting = true;
        this.shoot();
    }
};

Weapon.prototype.stopShooting = function()
{
    console.log("stopShooting");
    //this.isShooting = false;
    this.shootTimer.stop();
};

Weapon.prototype.shoot = function()
{
    console.log("shoot, barrelLength: "+this.player.barrelLength);
    var p = new Phaser.Point(this.player.x, this.player.y);
    p.rotate(p.x, p.y, this.player.rotation, false, this.player.barrelLength);

    this.addBullets(p.x, p.y, this.player.angle, 0, 0);
};

Weapon.prototype.addBullets = function(pX, pY, pAngle, gX, gY)
{
    this.add(new BulletPistol(game), true);
    this.getFirstExists(false).fire(pX, pY, pAngle, gX, gY);
};

////////////////////////////////////////////////////////////
//    PISTOL
////////////////////////////////////////////////////////////

var WeaponPistol = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Pistol', false, true, Phaser.Physics.ARCADE);

    this.name = 'Pistol';
    this.fireRate = 400;
};

WeaponPistol.prototype = Object.create(Weapon.prototype);
WeaponPistol.prototype.constructor = WeaponPistol;

////////////////////////////////////////////////////////////
//    REVOLVER
////////////////////////////////////////////////////////////

var WeaponRevolver = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Revolver', false, true, Phaser.Physics.ARCADE);

    this.name = 'Revolver';
    this.nextFire = 0;
    this.fireRate = 600;
};

WeaponRevolver.prototype = Object.create(Weapon.prototype);
WeaponRevolver.prototype.constructor = WeaponRevolver;

WeaponRevolver.prototype.addBullets = function(pX, pY, pAngle, gX, gY)
{
    this.add(new BulletRevolver(game), true);
    this.getFirstExists(false).fire(pX, pY, pAngle, gX, gY);
};

////////////////////////////////////////////////////////////
//    SMG
////////////////////////////////////////////////////////////

var WeaponSMG = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'SMG', false, true, Phaser.Physics.ARCADE);

    this.name = 'SMG';
    this.fireRate = 600;
    this.repeatCount = 3;

    this.shootTimer = game.time.create(false);
    this.shootTimer.loop(100 * this.fireModifier, this.checkShots, this);
};

WeaponSMG.prototype = Object.create(Weapon.prototype);
WeaponSMG.prototype.constructor = WeaponSMG;

WeaponSMG.prototype.startShooting = function()
{
    if(!this.shootTimer.running)
    {
        this.shoot();
        this.repeatCount--;
        this.shootTimer.start();
    }
};

WeaponSMG.prototype.stopShooting = function()
{
    Weapon.prototype.stopShooting.call(this);

    this.repeatCount = 3;
    this.shootTimer.loop(100 * this.fireModifier, this.checkShots, this);
};

WeaponSMG.prototype.checkShots = function()
{
    this.shootTimer.stop();
    if(this.repeatCount == 2)
    {
        this.shootTimer.loop(100 * this.fireModifier, this.checkShots, this);
    }else if(this.repeatCount == 1){
        this.shootTimer.loop(this.fireRate * this.fireModifier, this.stopShooting, this);
    }
    this.shoot();
    this.repeatCount--;
    this.shootTimer.start();
};

////////////////////////////////////////////////////////////
//    SHOTGUN
////////////////////////////////////////////////////////////

var WeaponShotgun = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Shotgun', false, true, Phaser.Physics.ARCADE);

    this.name = 'Shotgun';
    this.numBullets = 5;
    this.fireRate = 1000;
};

WeaponShotgun.prototype = Object.create(Weapon.prototype);
WeaponShotgun.prototype.constructor = WeaponShotgun;

WeaponShotgun.prototype.addBullets = function(pX, pY, pAngle, gX, gY)
{
    var spreadAngle = (this.numBullets - 1) * this.SPREAD_ANGLE_WIDTH;

    for(var i = 0; i < this.numBullets; i++)
    {
        var bulletDirection = pAngle - spreadAngle/2 + i * this.SPREAD_ANGLE_WIDTH;

        this.add(new Bullet(game, 'img_BulletPistol'), true);
        this.getFirstExists(false).fire(pX, pY, bulletDirection, gX, gY);
    }
};

////////////////////////////////////////////////////////////
//    ASSAULT RIFLE
////////////////////////////////////////////////////////////

var WeaponAR = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Assault Rifle', false, true, Phaser.Physics.ARCADE);

    this.name = 'Assault Rifle';
    this.fireRate = 100;
};

WeaponAR.prototype = Object.create(Weapon.prototype);
WeaponAR.prototype.constructor = WeaponAR;

////////////////////////////////////////////////////////////
//    HMG
////////////////////////////////////////////////////////////

var WeaponHMG = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Heavy Machine Gun', false, true, Phaser.Physics.ARCADE);

    this.name = 'Heavy Machine Gun';
    this.fireRate = 250;
};

WeaponHMG.prototype = Object.create(Weapon.prototype);
WeaponHMG.prototype.constructor = WeaponHMG;

////////////////////////////////////////////////////////////
//    RPG
////////////////////////////////////////////////////////////

var WeaponRPG = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Rocket Launcher', false, true, Phaser.Physics.ARCADE);

    this.name = 'Rocket Launcher';
    this.fireRate = 2000;
};

WeaponRPG.prototype = Object.create(Weapon.prototype);
WeaponRPG.prototype.constructor = WeaponRPG;

WeaponRPG.prototype.addBullets = function(pX, pY, pAngle, gX, gY)
{
    this.add(new BulletRocket(game), true);
    this.getFirstExists(false).fire(pX, pY, pAngle, gX, gY);
};

////////////////////////////////////////////////////////////
//    FLAMETHROWER
////////////////////////////////////////////////////////////

var WeaponFlamethrower = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Flamethrower', false, true, Phaser.Physics.ARCADE);

    this.name = 'Flamethrower';
    this.fireRate = 100;
};

WeaponFlamethrower.prototype = Object.create(Weapon.prototype);
WeaponFlamethrower.prototype.constructor = WeaponFlamethrower;

WeaponFlamethrower.prototype.addBullets = function(pX, pY, pAngle, gX, gY)
{
    this.add(new BulletFireball(game), true);
    this.getFirstExists(false).fire(pX, pY, pAngle, gX, gY);
};

////////////////////////////////////////////////////////////
//    GRENADE LAUNCHER
////////////////////////////////////////////////////////////

var WeaponGL = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Grenade Launcher', false, true, Phaser.Physics.ARCADE);

    this.name = 'Grenade Launcher';
    this.fireRate = 500;
};

WeaponGL.prototype = Object.create(Weapon.prototype);
WeaponGL.prototype.constructor = WeaponGL;

WeaponGL.prototype.addBullets = function(pX, pY, pAngle, gX, gY)
{
    this.add(new BulletGrenade(game), true);
    this.getFirstExists(false).fire(pX, pY, pAngle, gX, gY);
};

////////////////////////////////////////////////////////////
//    SNIPER RIFLE
////////////////////////////////////////////////////////////

var WeaponSniper = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Sniper Rifle', false, true, Phaser.Physics.ARCADE);

    this.name = 'Sniper Rifle';
    this.fireRate = 1500;
};

WeaponSniper.prototype = Object.create(Weapon.prototype);
WeaponSniper.prototype.constructor = WeaponSniper;

////////////////////////////////////////////////////////////
//    LANDMINE
////////////////////////////////////////////////////////////

var WeaponLandmine = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Landmine', false, true, Phaser.Physics.ARCADE);

    this.name = 'Landmine';
    this.fireRate = 1000;
};

WeaponLandmine.prototype = Object.create(Weapon.prototype);
WeaponLandmine.prototype.constructor = WeaponLandmine;

WeaponLandmine.prototype.addBullets = function(pX, pY, pAngle, gX, gY)
{
    this.add(new BulletLandmine(game), true);
    this.getFirstExists(false).fire(pX, pY, pAngle, gX, gY);
};

////////////////////////////////////////////////////////////
//    GRENADE
////////////////////////////////////////////////////////////

var WeaponGrenade = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Grenade', false, true, Phaser.Physics.ARCADE);

    this.name = 'Grenade';
    this.fireRate = 1000;
};

WeaponGrenade.prototype = Object.create(Weapon.prototype);
WeaponGrenade.prototype.constructor = WeaponGrenade;

WeaponGrenade.prototype.addBullets = function(pX, pY, pAngle, gX, gY)
{
    this.add(new BulletGrenade(game), true);
    this.getFirstExists(false).fire(pX, pY, pAngle, gX, gY);
};

////////////////////////////////////////////////////////////
//    LASER RIFLE
////////////////////////////////////////////////////////////

var WeaponLaser = function(game, player)
{
    Weapon.call(this, game, player, game.world, 'Laser Rifle', false, true, Phaser.Physics.ARCADE);

    this.name = 'Laser Rifle';
    this.fireRate = 1000;
};

WeaponLaser.prototype = Object.create(Weapon.prototype);
WeaponLaser.prototype.constructor = WeaponLaser;

