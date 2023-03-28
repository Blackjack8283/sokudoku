window.onload = ()=>{
    const selector = document.getElementById('audio_num');
    const audio = document.getElementById('audio');

    const value = document.getElementById('value');
    const speed = document.getElementById('speed');

    let audio_num = undefined;

    selector.addEventListener('change', ()=>{
        if(selector.value == ""){
            audio_num = undefined;
            audio.style.display = "none";
        } else {
            audio_num = Number(selector.value);
            audio.style.display = "block";
            audio.src = `./audio/${selector.value}.mp3`;

            const storage = localStorage.getItem(`sokudoku${audio_num}`);
            const savedSpeed = storage ? storage : 1.00;

            value.textContent = `速度: x${savedSpeed}`;
            audio.playbackRate = savedSpeed;
            speed.value = savedSpeed;
            localStorage.setItem(`sokudoku${audio_num}`, speed.value);
        }
    });

    speed.addEventListener("input", (e) => {
        value.textContent = `速度: x${speed.value}`;
        audio.playbackRate = speed.value;
        if(audio_num != undefined){
            localStorage.setItem(`sokudoku${audio_num}`, speed.value);
        }
    })

    document.addEventListener('keydown', (e)=>{
        if(e.key == "ArrowRight" && audio_num != undefined) audio.currentTime += 3;
        else if(e.key == "ArrowLeft" && audio_num != undefined){
            audio.currentTime -= 3;
            audio.play();
        } else if(e.key == "ArrowUp"){
            speed.value -= -0.01;
            value.textContent = `速度: x${speed.value}`;
            audio.playbackRate = speed.value;
            if(audio_num != undefined){
                localStorage.setItem(`sokudoku${audio_num}`, speed.value);
            }
        } else if(e.key == "ArrowDown"){
            speed.value -= 0.01;
            value.textContent = `速度: x${speed.value}`;
            audio.playbackRate = speed.value;
            if(audio_num != undefined){
                localStorage.setItem(`sokudoku${audio_num}`, speed.value);
            }
        } else if(e.key == " "){
            if(audio.paused) audio.play();
            else audio.pause();
        }
    });
}