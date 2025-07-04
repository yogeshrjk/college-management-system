export const DeleteConfirmation = (props) => {
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white max-w-sm w-full p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-[#103d46] mb-3">Are you sure?</h2>
        <p className="text-[#103d46] mb-6">This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-5 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            onClick={props.onConfirm}
          >
            Delete
          </button>
          <button
            className="px-5 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-[#103d46] hover:text-white transition-colors duration-200"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
