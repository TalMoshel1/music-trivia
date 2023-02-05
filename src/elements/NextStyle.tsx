
type SuggestionStyleProps = {
    children?: React.ReactNode
}

function FewSuggestionsStyle({ children }: SuggestionStyleProps) {

    return <Ul>
        {children}
    </Ul>
}

export default FewSuggestionsStyle