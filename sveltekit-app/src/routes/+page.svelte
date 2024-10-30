<script>
	import { onMount } from 'svelte';
	import socket from '$lib/socket';  // Import shared socket instance
	import "../app.css";
  
	let question = "Write a fact about yourself";
	let answers = [];
	const gameCode = "GAME123"; 
	const username = "Main Screen"; 
  
	onMount(() => {
	  // Join game room and handle events on the main screen
	  socket.emit('join_game', { gameCode, username });
	  console.log(`Main screen joined game: ${gameCode} with username: ${username}`);
	  
	  socket.on('user_answered', (data) => {
		console.log("Answer received on main screen:", data);
		if (data && data.username && data.answer) {
		  answers = [...answers, data];
		} else {
		  console.error("Unexpected data structure received:", data);
		}
	  });
	});
  </script>
  
  <div class="container">
	<h1>Main Screen</h1>
	<h2>{question}</h2>
  
	<h3>Answers:</h3>
	<ul class="answer-list">
	  {#each answers as answer}
		<li><span class="username">{answer.username}</span>: <span class="answer">{answer.answer}</span></li>
	  {/each}
	</ul>
  </div>
  