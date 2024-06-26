import React, { useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import CreateUpdateTaskForm from './CreateUpdateTaskForm';
import { useQuery } from '@apollo/react-hooks';
import { ALL_TASKS } from '../api/queries/index.queries';

const columnHelper = createColumnHelper();

const Actions = ({ row }) => {
  // const removeShow = useRemoveShow();

  const handleRemove = () => {
    // removeShow.mutate(row.original.id)
  };
  return (
    <div>
      <CreateUpdateTaskForm data={row.original} modalId={`update-show-${row.original.id}`} />
      <button style={{ background: '#428bca' }} data-modal-target={`update-show-${row.original.id}`}>
        <svg width={12} height={12} aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="#fff" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
        </svg>
      </button>
      <button style={{ background: '#fa5252' }} onClick={handleRemove}>
      <svg width={12} height={12} aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="#fff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
      </svg>
      </button>
    </div>
  )
}

const TasksTable = () => {

  const defaultColumns = useMemo(
    () => [
      columnHelper.accessor(row => row.title, { id: 'title', header: 'Title' }),
      columnHelper.accessor(row => row.storyline, { 
        id: 'storyline', 
        header: 'Storyline',
        cell: props => (
          <span className='line-clamp-3'>{props.getValue()}</span>
        )
      }),
      columnHelper.accessor(row => row.platforms, { 
        id: 'platforms', 
        header: 'Available in' ,
        cell: props => props.getValue()?.map(x => x.name).join(", ")
      }),
      columnHelper.display({
        id: 'action',
        cell: Actions,
      }),
    ], []
  )

  const getAllTasks = useQuery(ALL_TASKS);
  
  const table = useReactTable({
    data: getAllTasks.data?.allTasks ?? [],
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (getAllTasks.loading) return <React.Fragment>Loading...</React.Fragment>;
  if (getAllTasks.error) return <React.Fragment>Error</React.Fragment>;
  
  return (
    <div className='wrapper'>
      <CreateUpdateTaskForm modalId="create-update-show" />
      <button data-modal-target="create-update-show">
        Create Show
      </button>
      <table className="rwd-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} data-th={cell.column.columnDef.header}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TasksTable