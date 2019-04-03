var answer=$(".answer");
var ans="";
$("button").each(function(){
    $(this).on('click',function(){
        var value=this.value;
        if(value=="="){
            var num=eval(ans);
            ans="";
            answer.val(num);
        }else if(value=="AC"){
            ans="";
            answer.val(ans);
        }else if(value=="CE"){
            ans=ans.slice(0,ans.length-1);
            answer.val(ans);
        }else if(parseInt(value,10)==value||value=="."||value=='+'||value=='-'||value=='*'||value=='/'||value=='%'){
            ans+=value;
            answer.val(ans);
        }
    });
});