import { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Player = 'X' | 'O';

const WINNING_LINES: [number, number, number][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calculateWinner(squares: (Player | null)[]): Player | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState<(Player | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(s => s !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "It's a Draw!"
      : `Next: ${xIsNext ? 'X' : 'O'}`;

  function handlePress(i: number) {
    if (squares[i] || winner || isDraw) return;
    const next = [...squares];
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
      <View style={styles.board}>
        {squares.map((s, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.cell,
              (i + 1) % 3 === 0 && styles.noRight,
              i >= 6 && styles.noBottom,
            ]}
            onPress={() => handlePress(i)}
          >
            <Text style={[styles.cellText, s === 'X' ? styles.x : styles.o]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => { setSquares(Array(9).fill(null)); setXIsNext(true); }}>
        <Text style={styles.btnText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.app}>
      <StatusBar barStyle="light-content" />
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#111',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 20,
  },
  board: {
    width: 270,
    height: 270,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#222',
    borderRadius: 12,
  },
  cell: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  noRight: {
    borderRightWidth: 0,
  },
  noBottom: {
    borderBottomWidth: 0,
  },
  cellText: {
    fontSize: 40,
    fontWeight: '800',
  },
  x: {
    color: '#FF4757',
  },
  o: {
    color: '#3742FA',
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#FF4757',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
