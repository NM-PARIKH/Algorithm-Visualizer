import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MergeCode from './MergeCode';
// import MergeComplexity from './MergeComplexity';
import './SortVisuals.css';

const MergeSort = () => {
    const myState = useSelector(state => state.updateProps);
    const dispatch = useDispatch();
    const [isPreviewShown, setPreviewShown] = useState(false);

    let arrVal = myState.arrVal.map((item) => item[0]);
    let ids = myState.arrVal.map((item) => item[1]);

    const mergeSort = (arrVal, ids, timer, l, r) => {
        if (l >= r)
            return;

        let mid = Math.floor((l + r) / 2);
      
        mergeSort(arrVal, ids, timer - 1, l, mid);
       
        mergeSort(arrVal, ids, timer - 1, mid + 1, r);

        setTimeout(() => {
            document.getElementById('midPart').style.backgroundColor = 'rgb(128, 223, 254)';
            document.getElementById('left').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
            document.getElementById('right').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
            document.getElementById('merge').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
            let color = [];
           
            for (let i = 0; i < 3; i++)
                color.push(Math.floor(Math.random() * 200));
                document.getElementById('midPart').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
                document.getElementById('left').style.backgroundColor = 'rgb(128, 223, 254)';
                document.getElementById('right').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
                document.getElementById('merge').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';

            for (let i = l; i <= r; i++)
                document.getElementById(ids[i]).childNodes[1].style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;

            for (let i = l; i <= r; i++) {
                for (let j = i + 1; j <= r; j++) {

                    if (arrVal[i] > arrVal[j]) {
                        [arrVal[i], arrVal[j]] = [arrVal[j], arrVal[i]];
                        [ids[i], ids[j]] = [ids[j], ids[i]];

                        let new_ids = [...ids];

                        document.getElementById(new_ids[i]).style.transform = `translateX(${i * 35}px)`;
                        document.getElementById(new_ids[j]).style.transform = `translateX(${j * 35}px)`;
                    }
                    document.getElementById('midPart').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
                    document.getElementById('left').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
                    document.getElementById('right').style.backgroundColor = 'rgb(128, 223, 254)';
                    document.getElementById('merge').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
                }
            }
        }, timer * 2000);
        document.getElementById('midPart').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
        document.getElementById('left').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
        document.getElementById('right').style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
        document.getElementById('merge').style.backgroundColor = 'rgb(128, 223, 254)';
    }

    const solve = () => {
        setPreviewShown(true);
       
        mergeSort(arrVal, ids, Math.ceil(Math.log(arrVal.length + 1)), 0, arrVal.length - 1);

        setTimeout(() => {
            
        }, (((myState.arrVal.length-1)*(myState.arrVal.length))/2)*myState.sortingSpeed+50);
    };

    useEffect(() => {
        if(myState.sortingAlgorithm==='merge'){
           console.log(myState.sortplay);
           if(myState.sortplay){
              console.log("-----------PLAY IS ON------------");
              solve();
           }
        }
     },[myState.sortplay]);

    return( <>
      <div id='codePart1'>
      <div id='midPart'style={{marginLeft:'30px'}}>
         <p> int mid = (low + high) / 2 ;</p>
      </div>
      <div id='left' style={{marginLeft:'30px'}}>
         <p> mergeSort(arr, low, mid);</p>
      </div>
      <div id='right' style={{marginLeft:'30px'}}>
         <p> mergeSort(arr, mid + 1, high); </p>
      </div>
      <div id='merge' style={{marginLeft:'30px'}}>
         <p>  merge(arr, low, mid, high);  </p>
      </div>
     </div>
    
    
      {isPreviewShown && <MergeCode/>}
    
    </>);
}

export default MergeSort;