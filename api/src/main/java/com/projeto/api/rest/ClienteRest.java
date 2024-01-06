package com.projeto.api.rest;

import com.projeto.api.domain.Cliente;
import com.projeto.api.repository.ClienteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/Cliente")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ClienteRest {

    private ClienteRepository clienteRepository;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Cliente>> findAll() {
        return ResponseEntity.ok().body(clienteRepository.findAll());
    }


    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Optional<Cliente>> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(clienteRepository.findById(id));
    }


    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Cliente> save(@RequestBody Cliente Cliente) {
        return ResponseEntity.ok(clienteRepository.save(Cliente));
    }


    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Cliente> update(@RequestBody Cliente updatedCliente, @PathVariable("id") Long id) {
        var Cliente = clienteRepository.findById(id).get();
        BeanUtils.copyProperties(updatedCliente, Cliente);
        return ResponseEntity
                .ok()
                .body(clienteRepository.save(Cliente));
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        clienteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    
}
