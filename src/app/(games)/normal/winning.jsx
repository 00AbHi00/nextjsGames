export default function winner(size)
{
        const combinations = [];
        
        // Rows
        for (let i = 0; i < size; i++) {
          combinations.push([...Array(size).keys()].map(j => i * size + j));
        }
    
        // Columns
        for (let i = 0; i < size; i++) {
          combinations.push([...Array(size).keys()].map(j => i + j * size));
        }
    
        // Diagonals
        combinations.push([...Array(size).keys()].map(i => i * size + i)); // Main diagonal
        combinations.push([...Array(size).keys()].map(i => i * size + (size - 1 - i))); // Anti-diagonal
    
        return combinations;
}