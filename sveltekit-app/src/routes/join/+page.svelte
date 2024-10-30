<script>
	import { onMount } from 'svelte';
	import socket, { websocket_server } from '$lib/socket';  // Import shared socket instance
  
	let gameCode = '';
	let username = '';
	let answer = '';
	let connected = false;
  
	onMount(() => {
	  console.log("Web socket sever: ", websocket_server)

	  socket.on('connect', () => {
		console.log('Connected to server');
		connected = true;
	  });
	});
  
	function joinGame() {
	  if (gameCode.trim() !== '' && username.trim() !== '') {
		socket.emit('join_game', { gameCode: gameCode.trim(), username: username.trim() });
		alert(`Joined game: ${gameCode} as ${username}`);
	  } else {
		alert('Please enter both a game code and username.');
	  }
	}
  
	function submitAnswer() {
	  if (answer.trim() !== '') {
		socket.emit('answer_question', { gameCode: gameCode.trim(), answer: answer.trim(), username });
		answer = ''; // Clear the input field after submission
	  }
	}
  </script>
  
  <div class="container">
	{#if connected}
	  <h1>Join Game</h1>
	  <input class="styled-input" bind:value={gameCode} placeholder="Enter game code" />
	  <input class="styled-input" bind:value={username} placeholder="Enter your username" />
	  <button on:click={joinGame}>Join Game</button>
  
	  <h2>Answer the Question</h2>
	  <input class="styled-input" bind:value={answer} placeholder="Enter your answer" />
	  <button on:click={submitAnswer}>Submit Answer</button>
	{:else}
	  <p>Connecting to the server...</p>
	{/if}
  </div>
  