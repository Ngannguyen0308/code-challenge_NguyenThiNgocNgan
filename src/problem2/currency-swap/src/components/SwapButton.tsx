const SwapButton = ({ onSwap }: { onSwap: () => void }) => {
    return (
        <button
            onClick={onSwap}
            className="w-full bg-slate-100 text-black py-2 rounded-md hover:bg-slate-300 cursor-pointer"
        >
            Confirm Swap
        </button>
    );
};

export default SwapButton;
