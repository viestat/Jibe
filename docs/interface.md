client sends POST to '/joinParty':
  data: 'partyString'

client sends POST to '/createParty':
  data: 'partyString'

client sends Post to '/addSong':
  data: {party: 'someParty', song: someSong}

client sends Get to '/queue':
  data: 'partyString'

server responds to Get request to '/queue' with:
  data: [{song}, {song}, {song}]

client sends Post to '/vote':
  data: {party: 'someParty', song: 'songName', vote: 1/-1}
  


