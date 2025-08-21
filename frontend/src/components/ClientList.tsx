import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { clients, Client } from "../clients";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { User, Badge, Calendar, Phone, Mail } from "lucide-react";

interface Props {
  selectedClientId: string | null;
  onSelect: (id: string) => void;
}

const ClientList: React.FC<Props> = ({ selectedClientId, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  const handleClientClick = (id: string) => {
    onSelect(id);
  };

  const handleDotsClick = (client: Client, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(client.id);
    setActiveClient(client);
    setOpen(true);
  };

  return (
    <ul className="space-y-2">
      {clients.map((client) => (
        <li key={client.id}>
          <div
            className={`w-full px-4 py-2 rounded-lg text-left text-sm font-medium flex items-center gap-3 justify-between transition cursor-pointer ${
              client.id === selectedClientId
                ? "bg-indigo-100 text-indigo-700 font-semibold shadow"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleClientClick(client.id)}
          >
            <div className="flex items-center gap-3">
              <img src={client.image} alt="Client" className="w-8 h-8 rounded-full object-cover" />
              <span>{client.firstName} {client.lastName}</span>
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={(e) => handleDotsClick(client, e)}
              aria-label="Show client info"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </li>
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white rounded-xl shadow-2xl p-6 min-w-[320px]">
          <DialogHeader>
            <DialogTitle className="mb-2 text-center">Client Information</DialogTitle>
            <DialogDescription>
              {activeClient && (
                <div className="flex flex-row gap-6 items-center w-full">
                  {/* Left: Image */}
                  <div className="flex-shrink-0">
                    <img src={activeClient.image} alt="Client" className="w-32 h-32 rounded-lg object-cover" />
                  </div>
                  {/* Right: Info */}
                  <div className="flex flex-col gap-3 items-start w-full">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <User className="w-5 h-5 text-indigo-500" />
                      {activeClient.firstName} {activeClient.lastName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="w-4 h-4 text-gray-500" />
                      <span className="font-mono">{activeClient.userId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {activeClient.dob}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {activeClient.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {activeClient.email}
                    </div>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        
        </DialogContent>
      </Dialog>
    </ul>
  );
};

export default ClientList;
