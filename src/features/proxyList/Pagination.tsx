import { range } from '../../utils'

function Button({ n, selected, onClick }: { n: number, selected: boolean, onClick: React.MouseEventHandler }) {
	return (
		<button disabled={ selected } onClick={ onClick }>{ n }</button>
	)
}

export default function Pagination({ totalPages, currentPage, switchToPage }: { totalPages: number, currentPage: number, switchToPage: (i: number) => void }) {
	if (totalPages === 1) {
		return null
	}

	return (
		<div id="pagination">
			{
				range(totalPages).map((pageNumber) => {
					return <Button key={ pageNumber } n={ pageNumber } selected={ pageNumber === currentPage } onClick={() => switchToPage(pageNumber)}/>
				})
			}
		</div>
	)
}
