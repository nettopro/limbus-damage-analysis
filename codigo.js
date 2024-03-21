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
        const listContainer = document.getElementById('list-container');
        //Creating the identities rows and putting them in the container.
        select_start.forEach(item => {
            const firstDivRow = document.createElement('div');
                firstDivRow.className = 'row list-row';        
            const secondDivRow = document.createElement('div');
                secondDivRow.className = 'row';   
            const idNameDiv = document.createElement('div');
                let idFinalName;
                idNameDiv.className = "col-md-6 p-0 label-list";
                if(item.special_group){
                    idFinalName = item.addon+" "+item.sinner_name;
                }
                else{
                    if(item.addon==undefined){
                        idFinalName = item.group_name+" "+item.sinner_name;
                    }
                    else{
                        idFinalName = item.group_name+" "+item.addon+" "+item.sinner_name;
                    }
                }
                idNameDiv.textContent=idFinalName;
            const sinnerNameDiv = document.createElement('div');
                sinnerNameDiv.className = "col-md-2 p-0 label-list";
                sinnerNameDiv.textContent = item.sinner_name;
            const rarityDiv = document.createElement('div');
                rarityDiv.className = "col-md-2 p-0 text-center label-list";
                rarityDiv.textContent = item.rarity;
            const seasonDiv = document.createElement('div');
                seasonDiv.className = "col-md-2 p-0 text-center label-list";
                seasonDiv.textContent = item.season;        
            const identityList = document.createElement('button');
                identityList.setAttribute("type","button");
                identityList.className = "btn buttonList";
                identityList.setAttribute("data-bs-toggle","button");
                identityList.setAttribute("aria-pressed","true");
            listContainer.appendChild(firstDivRow);
            firstDivRow.appendChild(identityList);
            identityList.append(secondDivRow);
            secondDivRow.append(idNameDiv);
            secondDivRow.append(sinnerNameDiv);
            secondDivRow.append(rarityDiv);
            secondDivRow.append(seasonDiv);
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