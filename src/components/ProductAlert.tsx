import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import CircularBar  from "@/components/ui/circularBar";
interface ScanData {
  title: string;
  barcode: string;
  score: number;
  reason: string;
}

interface ProductAlertProps {
  scanData: ScanData;
  onClose: () => void;
}

const ProductAlert: React.FC<ProductAlertProps> = ({ scanData, onClose }) => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{scanData.title}</AlertDialogTitle>
          <AlertDialogDescription>
            Barcode: {scanData.barcode}
            <div className="mt-4">
              <CircularBar
                title="Carbon Footprint"
                percentage={scanData.score}
                size={200}
                strokeWidth={20}
              />
            </div>
            <div className="mt-4">
              <strong>Environmental Impact:</strong> {scanData.reason}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductAlert;