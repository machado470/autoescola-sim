import type { ReactNode } from 'react'
import Button from './Button'

type Identifier = string | number

type Column<T> = {
  key: keyof T | string
  label: string
  render?: (item: T) => ReactNode
  className?: string
}

type TableProps<T extends { id: Identifier }> = {
  data: T[]
  columns: Column<T>[]
  emptyMessage?: string
  loading?: boolean
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

export function Table<T extends { id: Identifier }>({
  data,
  columns,
  emptyMessage = 'Nenhum registro encontrado.',
  loading,
  onEdit,
  onDelete
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-muted/70 p-6 text-center text-sm text-foreground/70">
        Carregando dados...
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="rounded-xl border border-border bg-muted/70 p-6 text-center text-sm text-foreground/70">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/40">
      <table className="min-w-full divide-y divide-border/60 text-left text-sm text-foreground/90">
        <thead className="bg-muted/80 text-xs uppercase tracking-wide text-foreground/60">
          <tr>
            {columns.map((column) => (
              <th key={column.key as string} className={`px-4 py-3 font-medium ${column.className ?? ''}`}>
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3 text-right">Ações</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-muted/60">
              {columns.map((column) => {
                const defaultValue = (item as Record<string, ReactNode | undefined>)[column.key as string]
                const content = column.render ? column.render(item) : defaultValue ?? '—'
                return (
                  <td key={column.key as string} className={`px-4 py-3 ${column.className ?? ''}`}>
                    {content}
                  </td>
                )
              })}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    {onEdit ? (
                      <Button variant="secondary" size="sm" onClick={() => onEdit(item)}>
                        Editar
                      </Button>
                    ) : null}
                    {onDelete ? (
                      <Button
                        variant="ghost"
                        onClick={() => onDelete(item)}
                        className="text-red-400 hover:text-red-300"
                        size="sm"
                      >
                        Remover
                      </Button>
                    ) : null}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
