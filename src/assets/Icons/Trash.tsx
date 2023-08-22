import IconProps from './IconProps'

export function Trash({ color = 'var(--white)' }: IconProps) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_620_1064)">
				<path d="M8.48276 20C8.04138 20 7.65517 19.8345 7.32414 19.5034C6.9931 19.1724 6.82759 18.7862 6.82759 18.3448V6.89655C6.58851 6.89655 6.3908 6.81678 6.23448 6.65724C6.07816 6.49768 6 6.29998 6 6.06414C6 5.82828 6.07931 5.63218 6.23793 5.47586C6.39655 5.31954 6.5931 5.24138 6.82759 5.24138H10.2759V4.82386C10.2759 4.58726 10.3552 4.3908 10.5138 4.23448C10.6724 4.07816 10.869 4 11.1034 4H13.1724C13.4069 4 13.6034 4.07931 13.7621 4.23793C13.9207 4.39655 14 4.5931 14 4.82759V5.24138H17.4483C17.6828 5.24138 17.8793 5.32115 18.0379 5.48069C18.1966 5.64025 18.2759 5.83795 18.2759 6.07379C18.2759 6.30965 18.1966 6.50575 18.0379 6.66207C17.8793 6.81839 17.6828 6.89655 17.4483 6.89655V18.3448C17.4483 18.7862 17.2828 19.1724 16.9517 19.5034C16.6207 19.8345 16.2345 20 15.7931 20H8.48276ZM8.48276 6.89655V18.3448H15.7931V6.89655H8.48276Z" fill={color} />
			</g>
			<defs>
				<clipPath id="clip0_620_1064">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}