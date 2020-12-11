window.addEventListener('load', function(){

    interfaceSetup();
    form();
    menu();

    exercices();

    exerciceBtnSwiper();

});

window.addEventListener('resize', function(){

    interfaceSetup();

});


const interfaceSetup = function()
{    
}



/**
 * 
 * @param {string} from class name of the screen to leave
 * @param {string} to   class name of the screen to arrive
 */
const switchScreens = function( from, to )
{
    const screenStates = [ 'screen-hideleft', 'screen-hideright', 'screen-display' ];

    screenStates.forEach( function( screenState )
    {
        if( document.querySelector( '.' + screenState ) )
        {
            document.querySelector( '.' + screenState ).classList.remove( screenState );
        }
    });

    if( from === 'submenu' )
    {
        document.querySelector( '.screen.' + from ).classList.add( 'screen-hideright' );
    }
    else
    {
        document.querySelector( '.screen.' + from ).classList.add( 'screen-hideleft' );
    }
    
    document.querySelector( '.screen.' + to ).classList.add( 'screen-display' );


}




const menu = function()
{
    const mainMenus = document.querySelectorAll( 'div.menu nav' );
    const subMenus = document.querySelectorAll( 'div.submenu nav' );

    if( mainMenus )
    {
        Array.prototype.forEach.call( mainMenus, function( mainMenu )
        {
            mainMenu.addEventListener( 'click', function()
            {
                let menuId = this.dataset.menu;

                if( subMenus )
                {
                    Array.prototype.forEach.call( subMenus, function( subMenu )
                    {        
                        // This could also been done instead with Ajax
                        if( subMenu.dataset.menu === menuId ) 
                        {
                            subMenu.classList.remove( 'hide' );
                        }
                        else
                        {
                            subMenu.classList.add( 'hide' );
                        }

                        switchScreens( 'menu', 'submenu' );
                    });
                }
            });
        });
    }

    

    if( subMenus )
    {
        Array.prototype.forEach.call( subMenus, function( subMenu )
        {
            subMenu.addEventListener( 'click', function()
            {
                switchScreens( 'submenu', 'menu' );
            });
        });
    }

}



const form = function()
{
    const labelPlaceholders = document.querySelectorAll( 'label.placeholder' );

    if( labelPlaceholders )
    {
        Array.prototype.forEach.call( labelPlaceholders, function( labelPlaceholder )
        {
            labelPlaceholder.nextElementSibling.addEventListener( 'focus', function()
            {
                this.previousElementSibling.classList.remove('placeholder');
            });
        });
    }


    
    const btnForm = document.querySelector( 'section.login form button' );

    if( btnForm )
    {
        btnForm.addEventListener( 'click', function( e )
        {
            e.preventDefault();

            let fieldsErrors = false;
            let requiredFields = this.parentNode.querySelectorAll('[required]');

            Array.prototype.forEach.call( requiredFields, function( requiredField )
            {
                if( requiredField.value === '' )
                {
                    fieldsErrors = true;

                    let alert = requiredField.parentNode.querySelector( 'label span.alert' );

                    alert.classList.remove('hide');
                }
            });

            let timeProcess = 0;

            if( timeProcess === 0 && !fieldsErrors )
            {
                let processLogin = setInterval(function()
                {    
                    document.querySelector( 'section.login time' ).classList.remove('hide');
                    document.querySelector( 'section.login form' ).classList.add('hide');
                    document.querySelector( 'section.login h1:first-of-type' ).classList.add('hide');
    
                    if( timeProcess < 3 )
                    {
                        timeProcess++;
                        if( timeProcess === 2)
                        {
                            document.querySelector( 'section.login time' ).classList.add('step1');
                        }
                        if( timeProcess === 3)
                        {
                            document.querySelector( 'section.login time' ).classList.add('step2');
                        }
                    }
                    else
                    {
                        document.querySelector( 'section.login time' ).classList.remove('step1');
                        document.querySelector( 'section.login time' ).classList.remove('step2');
                        clearInterval( processLogin );
                        document.querySelector( 'section.login h1:nth-child(2)' ).classList.remove('hide');
                        setTimeout( function(){ switchScreens( 'login', 'menu' ); }, 2000 );                        
                    }
    
                }, 600);
            }
        });
    }

}









const exercices = function()
{
    const exercices = document.querySelectorAll( 'div.screen.exercice section.exercice' );
    const buttonsExercices = document.querySelectorAll( 'div.screen.exercice footer button' );
    const progressbarExercice = document.querySelector( 'header progress' );
    const nbExercices = exercices.length;
    let nExercices = 1;
    
    if( exercices && buttonsExercices && progressbarExercice )
    {
        progressbarExercice.value = 100 * ( nExercices / nbExercices );

        Array.prototype.forEach.call( buttonsExercices, function( buttonExercice )
        {
            buttonExercice.addEventListener( 'click', function()
            {
                if( buttonExercice.parentNode.classList.contains( 'next' ) && buttonExercice.dataset.action === 'next' )
                {
                        
                    if( nbExercices > nExercices )
                    {
                        Array.prototype.forEach.call( exercices, function( exercice, index )
                        {
                            if( index === nExercices )
                            {
                                exercice.classList.remove('hide');
                            }
                            else
                            {
                                exercice.classList.add('hide');
                            }
                        });
                    }
                    else
                    {
                        Array.prototype.forEach.call( exercices, function( exercice, index )
                        {
                            exercice.classList.add('hide');
                        });

                        document.querySelector( 'div.screen.exercice section.result' ).classList.remove('hide');
                        document.querySelector( 'body' ).classList.add('success');
                    }
                    
                    nExercices++;
                    
                    progressbarExercice.value = 100 * ( nExercices / nbExercices );
                }
                else if( buttonExercice.parentNode.classList.contains( 'next' ) && buttonExercice.dataset.action === 'stop' )
                {
                    window.location.href = 'index.html';
                }
            });
        });

    }
}



const exerciceBtnSwiper = function()
{
    let unifyEvent = function( event ) 
    { 
        return event.changedTouches ? event.changedTouches[0] : event; 
    };
    
    let x0 = null;
    let x1 = null;
    let offsetSwipe = null;         // Tolerance for swipe
    let offsetSwipeWidth = null;
    let nMovements = 0;
    let nbBtns = 0;

    let lock = function( event ) 
    { 
        x0 = unifyEvent( event ).clientX;

        if( document.querySelector( '.onaction' ) )
        {
            document.querySelector( '.onaction' ).classList.remove( 'next' );
        }
    };

    
    let drag = function( event ) 
    {
        event.preventDefault();

        if( ( x0 || x0 === 0 ) && ( nMovements >= 0 && nMovements < nbBtns ) ) // Needs to be more specific so there is no movements for extreme limits. 
        {
            x1 = unifyEvent( event ).clientX;

            if( document.querySelector( '.onaction' ) )
            {
                document.querySelector( '.onaction' ).style.marginLeft = ( x1 - x0  ) + 'px';
            }
        }

    };

    
    let move = function( event )
    {
        /*
        console.log( 'x1', x1 );
        console.log( 'x0', x0 );
        console.log( 'end', x1 - x0 );
        console.log( 'end', x1 + x0 );
        console.log( 'offset', offsetSwipe );
        */
        let offsetDelta = x1 - x0;
        
        if( document.querySelector( '.onaction' ) )
        {
            if( !x1 || offsetDelta === 0 )
            {
                document.querySelector( '.onaction' ).classList.add('next');
            }
            else if( offsetDelta > 0 &&  offsetDelta > offsetSwipe )
            {
                nMovements--;

                document.querySelector( '.onaction' ).style.marginLeft = -Math.abs( offsetSwipeWidth ) * nMovements + 'px';
            }
            else if( offsetDelta < 0 &&  Math.abs( offsetDelta ) > offsetSwipe )
            {
                nMovements++;

                document.querySelector( '.onaction' ).style.marginLeft = -Math.abs( offsetSwipeWidth ) * nMovements + 'px';
            }
            else
            {
                document.querySelector( '.onaction' ).style.marginLeft = '0px';
            }
        }
        x0 = null;
        x1 = null;
    };



    const btnsSwitch = document.querySelectorAll('nav.swiper');

    Array.prototype.forEach.call( btnsSwitch, function( btnSwitch ){

        let btnsContainer = btnSwitch.querySelector( 'div' );

        let btns = btnSwitch.querySelectorAll( 'button' );

        nbBtns = btns.length;

        offsetSwipeWidth = btnSwitch.offsetWidth;

        offsetSwipe = offsetSwipeWidth * .25;
        
        btnsContainer.style.width = offsetSwipeWidth * nbBtns + 'px';

        btnsContainer.classList.add('onaction');

        btnsContainer.addEventListener('mousedown', function( e ){ lock( e ); });
        btnsContainer.addEventListener('touchstart', function( e ){ lock( e ); });

        btnsContainer.addEventListener('mousemove', function( e ){ drag( e ); });
        btnsContainer.addEventListener('touchmove', function( e ){ drag( e ); });

        btnsContainer.addEventListener('mouseup', function( e ){ move( e ); });
        btnsContainer.addEventListener('touchend', function( e ){ move( e ); });

        Array.prototype.forEach.call( btns, function( btn )
        {
            btn.style.width = btnSwitch.offsetWidth + 'px';
        });
    });
}