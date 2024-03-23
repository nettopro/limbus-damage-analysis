import {fetchIds} from './functions.js';
import { sortAndDisplayRows } from './functions.js';
//Input below.
$(document).ready(function() {
    //Extracting JSON information for the IDs.
    fetchIds(select_start => {
        //Search mechanism of the filter
        $('#search-input').on('keyup', function() {
            var value = $(this).val().toLowerCase();
            
            $('.list-row').filter(function() {
                var matchValue = false;
                $(this).find('.label-list').each(function() {
                    // If the label text matches the search value, set match to true
                    if ($(this).text().toLowerCase().indexOf(value) > -1) {
                        matchValue = true;
                    }
                });
                $(this).toggle(matchValue);
            });
        });
        let sortAscending=true;
        let filter_label=0; 
        //Selecting the container that all the rows/buttons are in.
        //Creating the identities rows and putting them in the container.
        select_start.forEach(item => {
            //First Row
            let firstRow = $('<div></div>')
                .addClass('row')
                    .appendTo('#list-container');     
            //Main button
            let mainButton = $('<button>')
                .addClass('btn buttonList')
                    .attr({'type':'button',
                    'data-bs-toggle':'button',
                    'aria-pressed':true}).appendTo(firstRow);
            //Second Row
            let secondRow = $('<div></div>')
                .addClass('row')
                    .appendTo(mainButton);
            //Identity Name Label
            let idFinalName = item.special_group ? 
            item.addon + " " + item.sinner_name : 
            item.group_name + " " + item.addon + " " + item.sinner_name;
            //Append Labels to Second Row
            //Identity Label
            $('<div></div>').addClass('col-md-6 p-0 label-list').text(idFinalName).appendTo(secondRow);
            //Sinner Name Label
            $('<div></div>').addClass('col-md-2 p-0 label-list').text(item.sinner_name).appendTo(secondRow);
            //Rarity Label
            $('<div></div>').addClass('col-md-2 p-0 label-list text-center').text(item.rarity).appendTo(secondRow);
            //Season Label
            $('<div></div>').addClass('col-md-2 p-0 label-list text-center').text(item.season).appendTo(secondRow);     
        });
        let rowsArray = [];
        //Pushing the rows into an array (For some reason, it pushes the row then makes an empty one?)
        //I had to make it only push it every other row.
        $('#list-container .row').each(function(index) {
            if(index%2==0){
                rowsArray.push(this);
            }
        });
        //Buttons.
        //Toggle the List Button.
        $(document).on("click",".buttonList",function(){
            $('.buttonList').removeClass('active');
            $(this).addClass('active');
        });
        //Toggle the ascending or descending sort on all the label buttons.
        $('.buttonLabel').on('click', function() {
            filter_label = parseInt($(this).data('filter-label'), 10); // Retrieve and parse the filter label
            sortAscending = !sortAscending; // Toggle the sorting direction
            $('.buttonLabel').text(function() {
                return $(this).text().replace(' ↑', '').replace(' ↓', '');
            });
            $(this).text(function() {
                return $(this).text() + (sortAscending ? ' ↓' : ' ↑');
            });
            sortAndDisplayRows(rowsArray, filter_label, sortAscending);
        });
    });
});