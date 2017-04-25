$('.thumbnail').click(function() {
    var objClicked = $(this);
    console.log(objClicked);
    $('.thumbnail').hide();

    if(objClicked.hasClass('project1') === true){
        console.log('This is project 1');
    } else if(objClicked.hasClass('project2') === true){
        console.log('This is project 2');
    }
});
