/**
 * @description
 * Tiny Vanilla JavaScript dropdown styled as per the
 * dropdown selectors in the Watson Content Hub UI.
 *
 * @class
 * @param {(string|Object)} options.elem - HTML id of the select or the DOM element.
 */
var VanillaSelect = function(options) {
    var elem          = typeof options.elem === 'string' ?
            document.getElementById(options.elem) : options.elem,
        mainClass     = 'js-Dropdown',
        titleClass    = 'js-Dropdown-title',
        listClass     = 'js-Dropdown-list',
        selectedClass = 'is-selected',
        openClass     = 'is-open',
        selectOptions = elem.querySelectorAll('option'),
        optionsLength = selectOptions.length;

    // creating the pseudo-select container
    var selectContainer = document.createElement('div');

    selectContainer.className = mainClass;
    selectContainer.id = 'custom-' + options.elem;

    // creating the always visible main button
    var button = document.createElement('button');

    button.className = titleClass;
    button.textContent = selectOptions[0].textContent;

    // creating the UL
    var ul = document.createElement('ul');
    ul.className = listClass;

    for (var i = 0; i < optionsLength; i++) {
        var li = document.createElement('li');

        li.innerText = selectOptions[i].textContent;
        li.setAttribute('data-value', selectOptions[i].value);
        li.setAttribute('data-index', i);

        if (selectOptions[i].getAttribute('selected') !== null) {
            li.classList.add(selectedClass);
            button.textContent = selectOptions[i].textContent;
        }

        ul.appendChild(li);
    }

    // appending the button and the list
    selectContainer.appendChild(button);
    selectContainer.appendChild(ul);

    selectContainer.addEventListener('click', onClick);

    // pseudo-select is ready - append it and hide the original
    elem.parentNode.insertBefore(selectContainer, elem);
    elem.style.display = 'none';


    /**
     * Closes the current select on any click outside of it.
     *
     */
    document.addEventListener('click', function(e) {
        if (!selectContainer.contains(e.target)) close();
    });

    /**
     * Handles the clicks on current select.
     *
     * @param {object} e - The item the click occured on.
     */
    function onClick(e) {
        e.preventDefault();

        var t = e.target; // || e.srcElement; - uncomment for IE8

        if (t.className === titleClass) {
            toggle();
        }

        if (t.tagName === 'LI') {
            selectContainer.querySelector('.' + titleClass).innerText = t.innerText;
            elem.options.selectedIndex = t.getAttribute('data-index');

            //trigger 'change' event
            var evt = new Event('change');
            elem.dispatchEvent(evt);

            // highlight the selected
            for (var i = 0; i < optionsLength; i++) {
                ul.querySelectorAll('li')[i].classList.remove(selectedClass);
            }
            t.classList.add(selectedClass);

            close();
        }
    }

    /**
     * Toggles the open/close state of the select on title's clicks.
     *
     * @public
     */
    function toggle() {
        if (ul.classList.contains(openClass)) {
            // Currently open
            close();
        } else {
            // Currently closed
            open();
        }
    }

    /**
     * Opens the select.
     *
     * @public
     */
    function open() {
        ul.classList.add(openClass);
        button.classList.add(openClass);
        wch.setHeight(400);
    }

    /**
     * Closes the select.
     *
     * @public
     */
    function close() {
        ul.classList.remove(openClass);
        button.classList.remove(openClass);
        wch.setHeight(100);
    }

    return {
        toggle: toggle,
        close:  close,
        open:   open
    };
};