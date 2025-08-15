using System;
using System.Collections.Generic;
using System.Linq;

public class Logica
{
    /// <summary> 
    /// Recebe um array de números e retorna um novo array contendo apenas os números que aparecem exatamente uma vez no array original.
    /// Exemplo: Entrada: [1, 2, 2, 3, 4, 4, 5] → Saída: [1, 3, 5]
    /// </summary>
    public int[] FiltrarNumerosUnicos(int[] numeros)
    {
        // Verifica se o array é nulo ou vazio
        if (numeros == null || numeros.Length == 0)
        {
            // Retorna um array vazio se o array de entrada for nulo ou vazio.
            return new int[0];
        }

        // Dicionário para armazenar o número e contar as repetições.
        var contagemRepeticoes = new Dictionary<int, int>();

        // Itera sobre cada número no array, preenchendo o dicionário com a contagem de repetições.
        foreach (var n in numeros)
        {
            // Verifica se o número já está no dicionário e incrementa a contagem, OU adiciona o número com contagem 1.
            if (contagemRepeticoes.ContainsKey(n))
            {
                contagemRepeticoes[n]++;
            }
            else
            {
                contagemRepeticoes[n] = 1;
            }
        }

        // Filtra os números que aparecem apenas uma vez e os transforma em um array.
        var numerosUnicos = contagemRepeticoes.Where(kvp => kvp.Value == 1).Select(kvp => kvp.Key).ToArray();

        return numerosUnicos;
    }
}
