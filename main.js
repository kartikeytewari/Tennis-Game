// configuration of canvas
const canvas=document.getElementById("canvas_game");
const canvas_context=canvas.getContext("2d");
const frame_rate=200;
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// initial configuration of ball
let ball_x=canvas.width/2;
let ball_y=canvas.height/2;
let ball_speed_x=2;
let ball_speed_y=2;

// configuration of paddle
const paddle_length=100;
const paddle_width=5;
let left_y=0;

// initial score configuration
let score_user=0;
let score_comp=0;
const win_score=10;
let result_screen=false;

// loading on screen
window.onload=function()
{
    setInterval(function(){
        make_background();
        show_result_screen();
        make_partition();
        make_paddle_left();
        make_paddle_right();
        make_ball();
        show_score();
        auto_left_movement();
        configure_direction();
        move_ball();
    },1000/frame_rate);

    function handleInteraction(evt) {
        evt.preventDefault();
    }
    canvas.addEventListener('touchmove', function(evt){
        mouse_pos=mouse_position_calc(evt);
    });
    canvas.addEventListener('mousemove', function(evt){
        mouse_pos=mouse_position_calc(evt);
    });
}

function show_result_screen()
{
    if (result_screen)
    {
        result_screen=false;
        if (score_comp>score_user)
        {
            window.location.replace("win_computer.html")
        }
        else
        {
            window.location.replace("win_user.html");
        }
        score_user=0;
        score_comp=0;
    }
}

function show_score()
{
    canvas_context.fillStyle="white";
    canvas_context.fillText(score_comp,200,150);
    canvas_context.fillText(score_user,canvas.width-200,150);
}

function auto_left_movement()
{
    if (left_y<=ball_y-50)
    {
        left_y=left_y+10;
    }
    else if (left_y>=ball_y+50)
    {
        left_y=left_y-10;
    }
}

function ball_reset()
{
    if ((score_comp==win_score)||(score_user==win_score))
    {
        result_screen=true;
    }

    ball_x=canvas.width/2;
    ball_y=canvas.height*Math.random();
    ball_speed_x=(Math.random()*2)+2;
    ball_speed_y=(Math.random()*2)+2;
}

function make_background()
{
    canvas_context.fillStyle="black";
    canvas_context.fillRect(0,0,canvas.width,canvas.height);
}

function make_partition()
{
    canvas_context.fillStyle="white";
    for (let i=2;i<=canvas.height;i=i+40)
    {
        canvas_context.fillRect((canvas.width/2)-1,i,2,30);
    }
}

function make_paddle_left()
{
    canvas_context.fillStyle="white";
    if ((left_y>=paddle_length/2)&&(left_y<=canvas.height-(paddle_length/2)))
    {
        canvas_context.fillRect(0,left_y-(paddle_length/2),paddle_width,paddle_length);
    }
    else if (left_y<paddle_length/2)
    {
        canvas_context.fillRect(0,0,paddle_width,paddle_length);
    }
    else
    {
        canvas_context.fillRect(0,canvas.height-paddle_length,paddle_width,paddle_length);
    }
}

function make_paddle_right()
{
    canvas_context.fillStyle="white";
    if ((mouse_pos.y>=paddle_length/2)&&(mouse_pos.y<=canvas.height-(paddle_length/2)))
    {
        canvas_context.fillRect(canvas.width-paddle_width,mouse_pos.y-(paddle_length/2),paddle_width,paddle_length);
    }
    else if (mouse_pos.y<paddle_length/2)
    {
        canvas_context.fillRect(canvas.width-paddle_width,0,paddle_width,paddle_length);
    }
    else
    {
        canvas_context.fillRect(canvas.width-paddle_width,canvas.height-paddle_length,paddle_width,paddle_length);
    }
}

function make_ball()
{
    canvas_context.fillStyle="white";
    canvas_context.beginPath();
    canvas_context.arc(ball_x, ball_y, 10, 0, 2*Math.PI, true);
    canvas_context.fill();
}

function mouse_position_calc(evt)
{
    var rect=canvas.getBoundingClientRect();
    var root=document.documentElement;
    var mouse_x=evt.clientX-rect.left-root.scrollLeft;
    var mouse_y=evt.clientY-rect.top-root.scrollTop;

    return{
        x:mouse_x,
        y:mouse_y
    };
}

function move_ball()
{
    ball_x=ball_x+ball_speed_x;
    ball_y=ball_y+ball_speed_y;
}

function configure_direction()
{
    // Bouncing in X-axis
    if (ball_x<=0)
    {
        if ((left_y-(paddle_length/2)-2<=ball_y)&&(ball_y<=left_y+(paddle_length/2)+2))
        {
            ball_speed_x=-ball_speed_x;
            let delta=Math.abs(ball_y-left_y);
            ball_speed_y=(delta/25)+1;
        }
        else
        {
            score_user++;
            ball_reset();
        }
    }
    else if (ball_x>=canvas.width)
    {
        if ((mouse_pos.y-(paddle_length/2)-2<=ball_y)&&(ball_y<=mouse_pos.y+(paddle_length/2)+2))
        {
            ball_speed_x=-ball_speed_x;
            let delta=Math.abs(ball_y-mouse_pos.y);
            ball_speed_y=(delta/25)+1;
        }
        else
        {
            score_comp++;
            ball_reset();
        }
    }

    // Bouncing in Y-axis
    if (ball_y<=0)
    {
        ball_speed_y=-ball_speed_y;
    }
    else if (ball_y>=canvas.height)
    {
        ball_speed_y=-ball_speed_y;
    }
}