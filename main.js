// configuration of canvas
const canvas=document.getElementById("canvas_game");
const canvas_context=canvas.getContext("2d");
const frame_rate=200;
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// configuration of ball
let ball_x=0;
let ball_y=0;
let ball_speed_x=2;
let ball_speed_y=2;

// loading on screen
window.onload=function()
{
    setInterval(function(){
        make_background();
        make_ball();
        configure_direction();
        move_ball();
    },1000/frame_rate);
}

function make_background()
{
    canvas_context.fillStyle="black";
    canvas_context.fillRect(0,0,canvas.width,canvas.height);
}

function make_ball()
{
    canvas_context.fillStyle="white";
    canvas_context.fillRect(ball_x,ball_y,10,10);
}

function move_ball()
{
    ball_x=ball_x+ball_speed_x;
    ball_y=ball_y+ball_speed_y;
}

function configure_direction()
{
    if (ball_x==0)
    {
        ball_speed_x=2;
    }
    else if (ball_x==canvas.width)
    {
        ball_speed_x=-2;
    }

    if (ball_y==0)
    {
        ball_speed_y=2;
    }
    else if (ball_y==canvas.height)
    {
        ball_speed_y=-2;
    }
}