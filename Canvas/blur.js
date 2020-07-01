/**
 * Created by Administrator on 2016/2/5.
 */
var canvasWidth= window.innerWidth;     //������
var canvasHeight= window.innerHeight;    //������

var canvas= document.getElementById("canvas");   //����
var context= canvas.getContext("2d");            //����2d����

canvas.width= canvasWidth;            //���û����Ŀ�
canvas.height= canvasHeight;          //���û����ĸ�

var image= new Image();
var radius=50;
image.src = "1.jpg";
var clippingRegion= {           //��������    ����һ��Բ
    x:400,            //��ʼx����
    y:200,            //��ʼy����
    r:radius              //�뾶
};
var leftMargin= 0, topMagin= 0;
image.onload=function(e){         //ͼƬ������ɵ�ʱ����ִ��һ�λ���
    $("#blur-div").css("width",canvasWidth+"px");
    $("#blur-div").css("height",canvasHeight+"px");
    $("#image").css("width",image.width+"px");
    $("#image").css("height",image.height+"px");

    leftMargin= (image.width- canvas.width)/2;
    topMagin= (image.height- canvas.height)/2;
    $("#image").css("left","-"+leftMargin+"px");
    $("#image").css("top","-"+topMagin+"px");
    initCanvas();
};
function initCanvas(){
    clippingRegion ={
        x:Math.random()*(canvas.width-2*radius)+radius,
        y:Math.random()*(canvas.height-2*radius)+radius,
        r:radius
    };

    draw( image ,clippingRegion );                   //���ƺ���
}

function setClippingRegion( clippingRegion ){
    context.beginPath();   //��ʼ·��
    context.arc( clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, true);
    context.clip();     //����
}

function draw( image ){
    context.clearRect(0,0, canvas.width, canvas.height);      //��ջ���
    context.save();       //�洢��ǰ״̬
    setClippingRegion( clippingRegion );
    context.drawImage( image,leftMargin,topMagin,canvas.width,canvas.height,0,0,canvas.width,canvas.height);       //����ͼ��
    context.restore();    //��ʼ��
}

/*��ʾ����ͼ��*/
function show(){
   var time= setInterval(function(){
        /*�ı��������Բ�İ뾶*/

       if(clippingRegion.r>= 1.5*Math.max(canvas.width,canvas.height)){
           clearInterval(time);
       }else{
           clippingRegion.r+=20;
       }
       console.log(clippingRegion.r);
        draw(image, clippingRegion);
    },30);
}

/*�����ʾԲ*/
function reset(){
    /*���³�ʼ��һ��*/
    initCanvas();
}
